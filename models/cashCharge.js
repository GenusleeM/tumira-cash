import mongoose from "mongoose";

const CashChargeSchema = new mongoose.Schema({
  name:String,

  percentage:{
    type:Number,
    required:[true, "Please Provide the %"]
  }

} , {timestamps:true});

const CashCharge = mongoose.model("CashCharge", CashChargeSchema);

export default CashCharge;
