import mongoose from 'mongoose'
import createDate from '../util/createDate.js';


const UserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"Please provide the firstname"]
    },
    lastname:{
        type:String,
        required:[true,"Please provide the lastname"]
    },
    id_number:{
        type:String,
        required:[true,"Please provide the id number"]
    },
    email:{
        type:String,
        required:[true, "Please provide an email"],
        unique:true
    },
    
    /**cash fields */
    cashBalance:{
        type:Number,
        default:0.0,
        // required:[true,"Default balance = 0.0"]
    },
    cashAllocated:{
        type:Number,
        default:0.0,
        // required:[true,"Default balance = 0.0"]
    },


    balance:{
        type:Number,
        default:0.0,
        // required:[true,"Default balance = 0.0"]
    },
    allocated:{
        type:Number,
        default:0.0,
        // required:[true,"Default balance = 0.0"]
    },
    creditLimit:{
        type:Number,
        default:0.0,
        // required:[true,"Default balance = 0.0"]
    },

    password:{
        type:String,
        required:[true,"Please add  a password"],
        minlength:6,
        // when we query  for the user do we want to return the password 
        select:false
    },
    phone:String,
    address:String,
    role:{
        default:"user",
        type: String,
    },

    joinDate:{
        type :Date,
        default: new Date()

    }
});

const User = mongoose.model("User",UserSchema)

export default User