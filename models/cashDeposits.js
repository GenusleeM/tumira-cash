import mongoose from "mongoose";

const CashDepositSchema = new mongoose.Schema(
  {
    clientId: {
      type: String,
      required: [true, "Please provide the client id"],
    },

    currency: {
      type: String,
      required: [true, "Please provide the currency"],
    },
    companyName: {
      type: String,
      required: [true, "Please provide company Name"],
    },
    amount: {
      type: Number,
      max:300,
      min:10,
      required: true
    },
    receiverName: {
      type: String,
      required: [true, "Please provide the receiver name"],
    },
    receiverId: {
      type: String,
      required: [true, "Please provide the reciver Id Number"],
    },
    reciverNumber: {
      type: String,
      required: [true, "Please provide the phone number"],
    },
    charge: Number,
    chargeAmount: Number,
    actualDepositAmount: Number /**before the actual deduction */,

    status: {
      type: String,
      required: [true, "provide the status of the deposit"],
    },
    decline_reason: {
      type: String,
      // required:[true, "provide the status of the deposit"],
    },
    bank: {
      type: String,
      required: [true, "provide the type of the deposit"],
    },

    reference: String,
 
    loaded_by: {
      type: String,
      required: [true, "Please log in to load deposit"],
      // get this from the token which created it
      // when we query  for the user do we want to return the password
    },
  },
  { timestamps: true }
);

const CashDeposit = mongoose.model("CashDeposit", CashDepositSchema);

export default CashDeposit;
