import CashReport from "../models/cashReport.js"

import { ROLES } from "../util/Roles.js"

export  const get_account_statement = async (req,res) =>{
    const { userId } = req.query
    let owner = req.user

    // check if its the admin the user _id has to be provide
    try {
        let all_transactions

        if(owner.role === ROLES.ADMIN){
            all_transactions  = await  CashReport.find({userId:userId}).sort({_id:-1}).limit(20)

            
        
        }else{
            all_transactions  = await  CashReport.find({userId:owner._id}).sort({_id:-1}).limit(20)

        }
        return res.json({
            success:true,
            message:"Account Statement Found",
            data:{
                statement:all_transactions
            }
        }).status(200)
        
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
        
    }
}