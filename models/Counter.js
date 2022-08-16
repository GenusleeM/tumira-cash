import mongoose from 'mongoose'


const NextOrderchema = new mongoose.Schema({
    name: String,
    nextOrderNumber:{
        type:Number,
        default:0
    }
});


const NextOrder = mongoose.model("NextOrder",NextOrderchema)

export default NextOrder