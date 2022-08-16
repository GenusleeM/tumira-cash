import mongoose from 'mongoose'


const CashReportSchema = new mongoose.Schema({
    userId:String,
    refenceId:{
        type:String,
        required:true
    },
    reference:String,
    description:{
        type:String,
    },
    amount:Number,
    chargeAmount:Number,
    charge:Number,
    actualDepositAmount:Number,
    reciverNumber:String,
    receiverName:String,
    receiverId:String,


    balance:Number,
    
},{timestamps:true});

const CashReport = mongoose.model("cashreport",CashReportSchema)

export default CashReport