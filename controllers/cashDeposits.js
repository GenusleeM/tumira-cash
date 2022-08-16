import User from "../models/User.js";
import { ORDERSTATE } from "../util/orderstates.js";
import createDate from "../util/createDate.js";
import formatBalance from "../util/formatBalance.js";
import { ROLES } from "./../util/Roles.js";
import axios from "axios";
import CashDeposit from "../models/cashDeposits.js";
import CashReport from "../models/cashReport.js";
import CashCharge from "../models/cashCharge.js";
import referralCodeGenerator from "referral-code-generator";
export const loadCashDeposit = async (req, res) => {
  // Custom date Transmission date of the message, format yyyyMMddHHmmss
  const t = new Date();
  const date = ("0" + t.getDate()).slice(-2);
  const month = ("0" + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  const hours = ("0" + t.getHours()).slice(-2);
  const minutes = ("0" + t.getMinutes()).slice(-2);
  const seconds = ("0" + t.getSeconds()).slice(-2);
  const sendDate = `${year}${month}${date}${hours}${minutes}${seconds}`;

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let customDate =t.toLocaleDateString("en-US", options)


// sending deposit logic
  let { clientId, bank, receiverName, receiverId, reciverNumber, amount } =
    req.body;
  let reference =sendDate + referralCodeGenerator.alphaNumeric("uppercase", 2, 2);
  // Amount deposited limit =300

  let actualDepositAmount;

  let currentCharge = await CashCharge.findOne({})
    .sort({ updatedAt: -1 })
    .limit(1);
  let actualPercentage = currentCharge.percentage;
  let chargeAmount;
if (amount<100) {
  chargeAmount = 3;
} else {
  chargeAmount = (actualPercentage / 100) * amount;
}
  // let chargeAmount = (actualPercentage / 100) * amount;

  // amount = Number(amount) - chargeAmount;
  actualDepositAmount = chargeAmount + Number(amount);
  // get the name of the person who loaded the deposit from the token
  const loaded_by = req.user.firstname + " " + req.user.lastname;

  //1.check if the client is there
  try {
    let email = clientId;

    const user = await User.findOne({ email });
    if (!user) {
      res.json({
        success: false,
        message: "the user selected not found",
        data: {
          user: null,
        },
      });
      return;
    }
    if (amount % 10 !== 0) {
      res.json({
        success: false,
        message: "You can only send amount dicisible by 10",
        data: {
          data: null,
        },
      });
      return;
    }
    //2.save the clients deposit

    const cashDeposit = await CashDeposit.create({
      clientId,
      date: createDate(),
      currency: "USD",
      bank,
      companyName: user.firstname + " " + user.lastname,
      amount: Number.parseFloat(amount).toFixed(2),
      chargeAmount: Number.parseFloat(chargeAmount).toFixed(2),
      charge: actualPercentage,
      actualDepositAmount,
      status: ORDERSTATE.PENDING,
      decline_reason: "N/A",
      receiverName: receiverName,
      receiverId: receiverId,
      reciverNumber: reciverNumber,
      reference: reference,
      loaded_by,
    });
    //3.update the client
    let new_cash_balance = Number(user.cashBalance) + Number(amount);
    user.cashBalance = Number.parseFloat(new_cash_balance).toFixed(2);
    await user.save();
    //4.update account balance of the user
    const update_user_account_statement = await CashReport.create({
      refenceId: cashDeposit._id,
      reference: reference,
      userId: user._id,
      date: createDate(),
      description: `Deposit ${bank}`,
      receiverName: receiverName,
      reciverNumber: reciverNumber,
      receiverId: receiverId,
      deposit: amount,
      chargeAmount: chargeAmount,
      charge: actualPercentage,
      actualDepositAmount,

      balance: Number.parseFloat(new_cash_balance).toFixed(2),
    });

    // Sending sms Logic
      let messageDate = sendDate;
      let messageText = `TUMIRACASH: \nGood day ${receiverName} You have received USD$${amount} from ${
        user.firstname + " " + user.lastname
      }. Ref No: ${reference} You can pick up the cash at any of our branches. Sent on ${customDate} ${hours}:${minutes}`;
      const messageReceiver = await axios({
        method: "POST",
        url: "https://mobile.esolutions.co.zw/bmg/api/single",
        auth: {
          username: process.env.SMSUSERNAME,
          password: process.env.SMSPASS,
        },


        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          originator: "TUMIRACASH",
          destination: reciverNumber,
          messageText: messageText,
          messageReference: reference,
          messageDate: messageDate,
          messageValidity: "",
          sendDateTime: "",
        }),
      });


      // Message the sender
      let senderNumber =user.phone
      let messageTextSender = `TUMIRACASH: \nGood day ${ user.firstname + " " + user.lastname}. You have sent USD$${amount} to  ${receiverName} . Ref No: ${reference}. Sent on ${customDate} ${hours}:${minutes}`;

      const messageSender = await axios({
        method: "POST",
        url: "https://mobile.esolutions.co.zw/bmg/api/single",
        auth: {
          username: "FANSETAPI",
          password: "duXxDXpg",
        },

        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          originator: "TUMIRACASH",
          destination: senderNumber,
          messageText: messageTextSender,
          messageReference: reference,
          messageDate: messageDate,
          messageValidity: "",
          sendDateTime: "",
        }),
      });

    res
      .json({
        success: "true",
        message: `Deposited Successfully`,
        data: {
          cashDeposit: cashDeposit,
          recieverMessage: messageReceiver.data,
          sernderMessage: messageSender.data,
        },
      })
      .status(200);
    return;
  } catch (error) {
    res
      .json({
        success: "false",
        message: error.message,
      })
      .status(402);
    return;
  }
};

export const update_deposit = async (req, res) => {
  let { depositId } = req.body;

  let filter = { _id: depositId };
  let depositStatus;
  try {
    depositStatus = await CashDeposit.findOne(filter);

    if (depositStatus === null) {
      try {
        depositStatus = await CashDeposit.findById(depositId);
        if (depositStatus !== null) {
          depositId = depositStatus.deposit_id;
          filter = { _id: depositId };
        }
      } catch (error) {
        return res
          .json({
            success: false,
            message: "deposit not found",
          })
          .status(401);
      }
    }

    if (depositStatus === null) {
      return res
        .json({
          success: false,
          message: "deposit not found",
        })
        .status(401);
    }

    if (depositStatus.status === ORDERSTATE.COMPLETE) {
      // logic when the admin wants to change the proof  and the quantity fueled
      //check if its the admin who wants to do the chnages
      if (req.user.role === ROLES.USER) {
        return res.status(500).json({
          success: false,
          message: "User can not edit any deposits",
        });

        //3.change the account statement
      } else {
        return res
          .json({
            success: false,
            message: "Deposit already executed",
            // executed_date: orderStatus.order_executed_date,
            // order_collection_office: orderStatus.order_collection_office,
            data: {
              deposit: depositStatus,
            },
          })
          .status(200);
      }
    } else {
      const update = {
        status: ORDERSTATE.COMPLETE,
        user: req.user.email,
      };
      const deposit = await CashDeposit.findOneAndUpdate(filter, update, {
        returnOriginal: false,
      });
      // CashDeposit is not defined
      // refund the execess amount to client
      // let amount_fueled = order.order_amount - order.price * order.quantity_fuelled_up;

      //update the user balance subtracting the actual balance and also allocated
      const user = await User.findOne({ email: deposit.clientId });
      let new_user_cash_balance =
        Number(user.cashBalance) - Number(deposit.amount);
      user.cashBalance = Number.parseFloat(new_user_cash_balance).toFixed(2);
      user.cashAllocated = Number(user.cashAllocated) - Number(deposit.amount);
      await user.save();

      // update the user balance when there is   a refuel

      const update_user_cash_account_statement = await CashReport.create({
        userId: user._id,
        refenceId: deposit._id,
        receiverName: deposit.receiverName,
        receiverId: deposit.receiverId,
        reciverNumber: deposit.reciverNumber,
        reference: deposit.reference,
        chargeAmount: deposit.chargeAmount,
        description: `Cash Collection  for Order : ${depositId}`,
        deposit: Number.parseFloat(deposit.amount).toFixed(2),

        balance: Number.parseFloat(new_user_cash_balance).toFixed(2),
      });

      return res.json({
        success: true,
        message: "cash withdrawal Success",
        data: {
          deposit: deposit,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// get all cash deposits

export const get_all_cash_deposits = async (req, res) => {
  const client_email = req.user.email;

  try {
    const allDeposits = await CashDeposit.find({ clientId: client_email })
      .sort({ _id: -1 })
      .limit(20);
    res
      .json({
        succes: true,
        message: "All Cash Deposits Found",
        data: {
          deposits: allDeposits,
        },
      })
      .status(200);

    return;
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
    return;
  }
};

export const number_of_deposits = async (req, res) => {
  try {
    const numOfDeposits = await CashDeposit.count();
    const completeDeposits = await CashDeposit.count({ status: "complete" });
    const pendingDeposits = await CashDeposit.count({ status: "pending" });
    const pendingDepositAmount = await CashDeposit.aggregate([
      { $match: { status: "pending" } },
      {
        $group: {
          _id: "",
          totalPendingAmount: { $sum: "$amount" },
          // --where "sum"=50
        },
      },
      {
        $project: {
          _id: 0,
          TotalPendingAmount: "$totalPendingAmount",
        },
      },
    ]);
    res
      .json({
        succes: true,
        message: "Number of All Cash Deposits Found",
        data: {
          total: numOfDeposits,
          pendingDeposits: pendingDeposits,
          completeDeposits: completeDeposits,
          pendingMoney: pendingDepositAmount,
        },
      })
      .status(200);

    return;
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
    return;
  }
};
