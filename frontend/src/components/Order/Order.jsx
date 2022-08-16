import { Button, FormControl, Input, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import FileBase64 from 'react-file-base64';
 

import "./Order.css";
import { axiosInstance } from "../../services/axios";


const Order = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let params = useParams();
  const [odernumber, setodernumber] = useState(params.orderid);
  const [state, setState] = React.useState('');
  const [formData, setformData] = useState({})
  const [upDateOrder, setupDateOrder] = useState({})

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value.trim() });
    console.log(formData)
    // console.log(e.target)

  };
  

  const handleOrderChange = (e) => {
    setupDateOrder({ ...upDateOrder, [e.target.name]: e.target.value.trim() });
    console.log(upDateOrder)
  };

  const getFiles = ({base64}) =>{
    //1.upload the file to firebase
    //2.return the url
    //3.upload the url with other stuff
    let my_url = "Admin Url"
    console.log(base64)
    setupDateOrder({...upDateOrder,proof_url:my_url})
  }

  const handleSubmit = async(e) =>{
      e.preventDefault()
      console.log( { "order_id":odernumber,...formData})
      try {
        let responce =  await axiosInstance.post('/order/cancelOrder',
        { "order_id":odernumber,...formData})
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
    console.log({ "orderId":odernumber,...upDateOrder})
    try {
      let responce =  await axiosInstance.post('/order/update',
      { "orderId":odernumber,...upDateOrder})
      let my_responce = responce.data.success

      if(my_responce === true){
          enqueueSnackbar('Order  Upadated Successfully',{variant: "success"});
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
          Update Order
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
            <MenuItem  value ="pending">pending</MenuItem>
            <MenuItem value="complete">complete</MenuItem>
            <MenuItem  value="cancelled">cancelled</MenuItem>
          </Select>

          <br/>
          <hr/>
          <br/>
            <br/>
          <Button onClick = {handleSubmit} variant = "contained" color = "primary">
              Update
          </Button>
        </FormControl>
      </div>
      </Paper>
      </div>
      <div>
      <Paper>
      <div className="myheading">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Update Order
        </Typography>
        <Typography>
                OrderNumber :{`${odernumber}`}
        </Typography>
        <br/>
        

        <FormControl fullWidth >
            
        
          <TextField
              variant="outlined"
              label="filling Reference"
              name="filling_reference"
              id = "hello1"
              onChange={handleOrderChange}
              // fullWidth
            ></TextField>
            <br/>

            <TextField
              variant="outlined"
              label="Quantity Fueled Up"
              name="quantity_fuelled_up"
              type="number"
              id= "helllo"
              onChange={handleOrderChange}
              // fullWidth
            ></TextField>

            <br/>
            <div>
            <FileBase64
              onDone={getFiles } />

            </div>

          
          <br/>
          <br/>
          <br/>
            <br/>
          <Button onClick = {handleSubmit2} variant = "contained" color = "primary">
              Update
          </Button>
        </FormControl>
      </div>
      </Paper>
      </div>
    </div>
  );
};

export default Order;
