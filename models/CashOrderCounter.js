import mongoose from 'mongoose'


const NextCashOrderSchema = new mongoose.Schema({
    name: String,
    nextOrderNumber:{
        type:Number,
        default:0
    }
});

const NextCashCounter = mongoose.model("NextCashOrder",NextCashOrderSchema)

export default NextCashCounter