import CashDeposit from "../models/cashDeposits.js";
import User from "../models/User.js";
import { ROLES } from "../util/Roles.js";
// MONGOURL=mongodb+srv://Genuslee:Map3dxe$$*@cluster0.mjha6.mongodb.net/TumiraCash?retryWrites=true&w=majority

export const get_all_users = async (req, res) => {
  try {
    let allUsers = await User.find({ role: ROLES.USER }).sort({ _id: -1 });
    res
      .json({
        totalUsers: allUsers.length,
        succss: true,
        message: "All Users Found",
        data: {
          users: allUsers,
        },
      })
      .status(200);
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const get_all_deposits = async (req, res) => {
  try {
    let allDeposits = await Deposit.find({}).sort({ _id: -1 }).limit(20);
    res
      .json({
        succss: true,
        message: "First All deposits Found",
        data: {
          deposits: allDeposits,
        },
      })
      .status(200);
  } catch (error) {
    res
      .json({
        success: false,
        message: error.message,
      })
      .status(500);
  }
};

export const get_all_orders = async (req, res) => {
  try {
    let allOrders = await Order.find({});
    res
      .json({
        succss: true,
        message: "Orders Found",
        data: {
          orders: allOrders,
        },
      })
      .status(200);
  } catch (error) {
    res
      .json({
        success: false,
        message: error.message,
      })
      .status(500);
  }
};

export const get_all_user_details = async (req, res) => {
  const { userid } = req.body;
  try {
    let user = await User.findById(userid);
    res
      .json({
        succss: true,
        message: "User found",
        data: {
          user: user,
        },
      })
      .status(200);

    return;
  } catch (error) {
    res
      .json({
        success: false,
        message: error.message,
      })
      .status(500);

    return;
  }
};

export const get_all_user_transactions = async (req, res) => {
  const { userid } = req.body;

  // get all orders
  //get all deposits
  //sort them by date in acendinf order
  //send it to client

  try {
    let responce = await User.findById(userid);
    // the the user email
    let user_email = responce.email;

    // first get all the orders
    let all_orders = await Order.find({ client_id: user_email })
      .sort({ _id: -1 })
      .limit(20);
    let formarted_orders = all_orders.map((order) => {
      return {
        date: order.order_date,
        description: `${order.truck} : ${order.driver} : ${order.order_collection_office}`,
        type: "order",
        order: order.order_amount,
        reference: order.order_id,
      };
    });

    let all_deposits = await Deposit.find({ clientId: user_email })
      .sort({ _id: -1 })
      .limit(20);
    let formarted_deposits = all_deposits.map((deposit) => {
      return {
        date: deposit.date,
        description: `${deposit.bank}`,
        type: "deposit",
        deposit: deposit.amount,
        reference: deposit.reference,
      };
    });

    let all_transactions = [...formarted_deposits, ...formarted_orders];

    res
      .json({
        success: true,
        message: "All Transactiion Found",
        data: {
          trans: all_transactions,
        },
      })
      .status(200);

    return;
  } catch (error) {
    res
      .json({
        success: false,
        message: error.message,
      })
      .status(500);

    return;
  }
};

export const get_all_user_prices = async (req, res) => {
  try {
    let allPrices = await Price.find();

    res.json({
      success: true,
      message: "Prices Found ",
      data: {
        prices: allPrices,
      },
    });
  } catch (error) {
    res.json({
      succss: false,
      message: `${error.message}`,
    });
  }
};

/** cash admin duties */

export const get_all_cash_deposits = async (req, res) => {
  try {
    let allDeposits = await CashDeposit.find({}).sort({ _id: -1 }).limit(20);
    let sumDeposits = await CashDeposit.aggregate([
      {
        $group: {
          _id: null,
          TotalAmount: {
            $sum: "$actualDepositAmount",
          },
          TotalCommission: {
            $sum: "$chargeAmount",
          },
        },
      },
    ]);
    res
      .json({
        succss: true,

        message: "First All deposits Found",
        results: allDeposits.length,

        data: {
          cashDeposits: allDeposits,
          totalDeposited: sumDeposits,
        },
      })
      .status(200);
  } catch (error) {
    res
      .json({
        success: false,
        message: error.message,
      })
      .status(500);
  }
};


export const get_statistics = async (req, res) => {
  try {
    let sumDeposit = await CashDeposit.aggregate([
      {
        $group: {
          _id: "",
          totalAmount: { $sum: "$actualDepositAmount" },
          totalCommission: { $sum: "$chargeAmount" },
        },
      },
      {
        $project: {
          _id: 0,
          TotalAmount: "$totalAmount",
          TotalCommission: "$totalCommission",
        },
      },
    ]);

    res
      .json({
        succss: true,

        message: "The states successfully generated ",
        data: { totalDeposited: sumDeposit },
      })
      .status(200);
  } catch (error) {
    res
      .json({
        success: false,
        message: error.message,
      })
      .status(500);
  }
};
