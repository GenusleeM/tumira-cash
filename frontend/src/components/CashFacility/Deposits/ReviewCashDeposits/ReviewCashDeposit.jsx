import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import "./review.css";
import { Button, Divider } from "@material-ui/core";
import { Box } from "@mui/system";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { axiosInstance } from "../../services/axios";
import numberFormat from "../../services/CurrencyFormat";



export default function ReviewCashDeposit({ state, handleChange, handleNext,handlePrev ,handleSubmit}) {
  const [price, setprice] = useState(null)
  let {data} = state
  
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
  let handleSubmitandNext = (e) =>{
    handleNext()
    handleSubmit(e)
  }



  return (
    <React.Fragment>
      <div className="orderNumber newUserItem">
        <Typography variant="h5">Order Number: XX-XX-XX-XX</Typography>
      </div>

      <List className="myList">
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText primary={"charge"} />
          <Typography variant="body2">{numberFormat(data.chargeAmount)}</Typography>
        </ListItem>

        {/* <ListItem sx={{ py: 0, px: 0 }}> */}
          {/* <ListItemText primary={"Quantity To be Fueled"} />
          <Typography variant="body2">{data.quantity} L</Typography>
        </ListItem> */}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Amount" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {
              // numberFormat( Number(data.quantity)*Number(price))
              numberFormat(data.amount)
            }
          </Typography>
        </ListItem>
      </List>
      <Divider variant="middle" />
      {/* <br/> */}

      <Typography variant="h6" gutterBottom>
        Order Details
      </Typography>
      <div className="orderDetailsContainer">
        <div className="orderItemContainer">
          <Typography variant="subtitle1" className="orderItemTitle">
            Sender Name
          </Typography>
          <div className="orderItem">
            <Typography variant="subtitle1" className="orderItem">
              {data.firstname} {data.lastname}
            </Typography>
          </div>
        </div>

        <div className="orderItemContainer">
          <Typography variant="subtitle1" className="orderItemTitle">
            Receiver Name
          </Typography>
          <div className="orderItem">
            <Typography variant="subtitle1" className="orderItem">
            {data.recieverName}
            </Typography>
          </div>
        </div>
        <div className="orderItemContainer">
          <Typography variant="subtitle1" className="orderItemTitle">
            Reciver Id
          </Typography>
          <div className="orderItem">
            <Typography  className="orderItem">
            {data.recieverId}
            </Typography>
          </div>
        </div>

        <div className="orderItemContainer">
          <Typography variant="subtitle1" className="orderItemTitle">
            Reciever Phone
          </Typography>
          <div className="orderItem">
            <Typography variant="subtitle1" className="orderItem">
              {data.receiverPhone}
            </Typography>
          </div>
        </div>
        {/* <div className="orderItemContainer">
          <Typography variant="subtitle1" className="orderItemTitle">
            Trailers
          </Typography>
          <div className="orderItem">
            <Typography variant="subtitle1" className="orderItem">
              {data.trailer}
            </Typography>
          </div>
        </div> */}
      <Divider/>
      <br/>

        <div className = "orderItemContainer buttom-buttons">

        <Button onClick ={handlePrev} variant="contained" color = "secondary" startIcon = {<ArrowBackIcon/>}>Back</Button>
        <Button  onClick ={handleSubmitandNext} variant="contained" color = "primary">PLACE ORDER</Button>

          </div>

      </div>
    </React.Fragment>
  );
}
