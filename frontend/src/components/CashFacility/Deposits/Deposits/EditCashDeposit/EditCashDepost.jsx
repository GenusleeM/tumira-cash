import { Button, FormControl, Input, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import FileBase64 from 'react-file-base64';
// import "./updateCashOrders.css";
import { cashaxiosInstance } from "../../../../../services/axios";


const EditCashDeposit = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let params = useParams();
  const [odernumber, setodernumber] = useState(params.id);
  const [state, setState] = React.useState('');
  const [formData, setformData] = useState({});
  const [upDateOrder, setupDateOrder] = useState({});

  const [states, setStates] = React.useState('');
  // const handleChange3 = (event) => {
  //   setStates(event.target.value)
  // }

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value.trim() });
    setStates(e.target.value)
    console.log(formData)
    // console.log(e.target)

  };
  

  const handleOrderChange = (e) => {
    setupDateOrder({ ...upDateOrder, [e.target.name]: e.target.value.trim() });
    console.log(upDateOrder)
  };


  const handleSubmit = async(e) =>{
      e.preventDefault()
      console.log( { "order_id":odernumber,...formData})
      try {
        let responce =  await cashaxiosInstance.post('/order/cancelOrder',
        { "orderId":odernumber,...formData})
        let my_responce = responce.data.success
        console.log(responce.data)

        if(my_responce === true){
            enqueueSnackbar('Order Cancelled Successfully',{variant: "success"});
        }
        else{
            enqueueSnackbar('Something went Wrong',{variant: "warning"});

        }
          
      } catch (error) {
        enqueueSnackbar(`${error.message}`,{variant: "error"});
      }
  }

  const handleSubmit2 = async(e) =>{
    e.preventDefault()
    console.log(upDateOrder)
    console.log({ "depositId":odernumber,...upDateOrder})
    try {
      let responce =  await cashaxiosInstance.post('/cash/update',
      { "depositId":odernumber})
      let my_responce = responce.data.success

      if(my_responce === true){
          enqueueSnackbar('Deposit  Upadated Successfully: Cash Collection confirmed',{variant: "success"});
      }
      else{
          enqueueSnackbar(`${responce.data.message}`,{variant: "warning"});

      }
        
    } catch (error) {
      enqueueSnackbar(`${error.message}`,{variant: "error"});
    }
}


  return (
    <div className="mainorderpage">
      <div className = "firstContainer">
      <Paper>
      <div className="myheading">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Confirm Withdrawal
        </Typography>
        <Typography>
                OrderNumber :{`${odernumber}`}
        </Typography>
        <br/>
        

        <FormControl fullWidth >
            
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="state"
            // variant="outlined"
            id="mystate"
            value= {formData.undefined}
            label="state"
            onChange={handleChange}
          >
          
            <MenuItem value="complete">complete</MenuItem>
            
          </Select>

          <br/>
          <hr/>
          <br/>
            <br/>
          <Button onClick = {handleSubmit2} variant = "contained" color = "primary"  style={{
                color: "white",
                backgroundColor: "#8e44ad",
                fontSize:"15px"
              }}>
              Update
          </Button>
        </FormControl>
      </div>
      </Paper>
      </div>
      
    </div>
  );
};

export default EditCashDeposit;
