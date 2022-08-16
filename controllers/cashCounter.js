import NextCashCounter from "../models/CashOrderCounter.js";
import { get_signed_token } from "../util/getsingedtoken.js";
import { ROLES } from "../util/Roles.js";

export const init = async (req, res) => {
    let new_cash_Counter = await NextCashCounter.updateOne(
        {name:"cashCounter"},
        {
          
        },
        { upsert: true }
      );
  
      return res
        .json({
          success: true,
          message: "Counter Initialised  successfully !!!!",
          data: {
            price: new_cash_Counter,
          },
        })
        .status(200);
    }

    
export const reset = async (req,res) =>{
    const {resetLevel} = req.body

    if(!resetLevel | !Number(resetLevel)){
        return res.json({
          success: false,
          message: "Please provide the counter resetLevel",
        });
    
      }
    
    let new_cash_Counter = await NextCashCounter.updateOne(
        {name:"cashCounter"},
        {
            nextOrderNumber:resetLevel
        },
        { upsert: true }
      );
  
      return res
        .json({
          success: true,
          message: "Counter Initialised  successfully !!!!",
          data: {
            price: new_cash_Counter,
          },
        })
        .status(200);
    }

/**utility to get the next number  */

export const getNextCashOrderNumber =  async () => {
    const filter = { name: "cashCounter" };
    const update = { $inc: { nextOrderNumber: 1 } };
  
    let doc = await NextCashCounter.findOneAndUpdate(filter, update, {
      returnOriginal: false,
    });
    return doc.nextOrderNumber;
  }


