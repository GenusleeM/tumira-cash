import mongoose from 'mongoose'


const DepositSchema = new mongoose.Schema({
    clientId:{
        type:String,
        required:[true,"Please provide the client id"]
    },
    date:{
        type:String,
        required:[true,"Please provide date of transaction date"]
    },
    currency:{
        type:String,
        required:[true,"Please provide the currency"]
    },
    companyName:{
        type:String,
        required:[true,"Please provide company Name"]
    },
    amount:{
        type:String,
        required:[true,"Please provide the amount"]
    },
    status:{
        type:String,
        required:[true, "provide the status of the deposit"],
        
    },
    decline_reason:{
        type:String,
        // required:[true, "provide the status of the deposit"],
    
    },
    bank:{
        type:String,
        required:[true, "provide the type of the deposit"],
    
    },
    
    reference:{
        type:String,
        unique:true,
        required:[true,"Please provide the recceipt Number"],
        // when we query  for the user do we want to return the password 
    },
    loaded_by:{
        type:String,
        required:[true,"Please log in to load deposit"],
        // get this from the token which created it 
        // when we query  for the user do we want to return the password 
    },

    
});

const Deposit = mongoose.model("Deposit",DepositSchema)

export default Deposit