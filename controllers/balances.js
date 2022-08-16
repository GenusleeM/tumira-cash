import User from "../models/User.js";


export const get_user_balance = async (req, res) => {
  let email = req.user.email

  try {
    let found_user = await User.findOne({email})
    if(found_user !==null){
      return res.json({
        success:true,
        messsage:"User Balances",
        data:{
          balance:found_user.balance,
          allocated:found_user.allocated,
          creditLimit:found_user.creditLimit

        }

      }).status(200)
    }else{
      return res.json({
        success:false,
      message:"No user ",
      data:{
        data:null
      }

      }).status(400)
      
    }
    
  } catch (error) {
    return res.json({
      success:false,
      message:error.message
    }).status(501)

    
  }
  
  
};
