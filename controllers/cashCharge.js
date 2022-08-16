import CashCharge from "../models/cashCharge.js";


export const create_cash_charge = async (req, res) => {
  const {percentage } = req.body;

  if(!percentage | !Number(percentage)){
    return res.json({
      success: false,
      message: "Please provide the % charge",
    });

  }

  try {
    let new_price = await CashCharge.updateOne(
      {name:percentage},
      {
        percentage,
      },
      { upsert: true }
    );

    return res
      .json({
        success: true,
        message: "New  Charge created !!!!",
        data: {
          price: new_price,
        },
      })
      .status(200);
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const get_latest_percentage_charge = async (req, res) => {


  // should return the price based on the id
  try {
  

    let charge_found = await CashCharge.findOne({}).sort({updatedAt:-1}).limit(1)

    return res.status(200).json({
      success:true,
      data:{
        latestCharge:charge_found
      }
    })
  
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};


export const delete_charge_price = async (req, res) => {
  let { id} = req.query;
  try {
    let deleted_charge = await CashCharge.findOneAndDelete({_id:id });

    if (deleted_charge !== null) {
      return res.json({
        success: true,
        message: "price Deleted Successfully",
        data: {
          price: deleted_charge,
        },
      });
    } else {
      return res.json({
        success: false,
        message: "Something Happened We could not delete the price",
        data: {
          price: null,
        },
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
      data: {
        price: null,
      },
    });
  }
};


/**get all previous charges */

export const get_prevous_charges = async (req,res) =>{


  try {

    let allPriceCharges = await CashCharge.find({})

    return res.status(200).json({
      success:true,
      results:allPriceCharges.length,
      data:{
        cashCharges:allPriceCharges
      }
    })
    
  } catch (error) {
    
  }
}
