import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { cashaxiosInstance } from "../../services/axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

export default function CashFee() {
  let DEBOUNCE_DELAY =5000
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({});
  const [odernumber, setodernumber] = useState("");
  const [amtCharge, setAmtCharge] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
    Charge();
  };

  const handleCharge = ()=>{
    Find();;
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const Charge = async () => {
    try {
      let feerepo = await cashaxiosInstance.get("/cashCharge/getCharge");
      //console.log(response);
      // console.log(response.data)
      console.log(feerepo.data.data.latestCharge.name);
      setodernumber(feerepo.data.data.latestCharge.name);

      if (feerepo) {
        let success = feerepo.data.success;
        if (success === true) {

        } else {
          // enqueueSnackbar('Charge not set', { variant: "warning" });
        }
        // check for the errors
      }
    } catch (error) {
      enqueueSnackbar(`${error.message}`, { variant: "error" });
    }
  };


  const Find = async (e) => {
      let depositedAmt = document.getElementById("amount").value;

      let charge = (odernumber/100)*depositedAmt;
      console.log(charge);
        if (charge) {
          enqueueSnackbar(`Calculated charge for $USD ${depositedAmt} is  $USD ${charge}`, { variant: "success", });
        } else {
          enqueueSnackbar('Failed to calculate, something went wrong', { variant: "warning" });
        }
  };
  return (
    <div>
      <MenuItem onClick={handleClickOpen}>Calculator</MenuItem>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
      Open form dialog
    </Button> */}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Calculate Charges</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Current Percentage : {`${odernumber}`} %
          </DialogContentText>
          <DialogContentText>
            <br />
          </DialogContentText>
          <DialogContentText>Enter the amount to be received</DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="amount"
            type="amount"
            fullWidth
            variant="standard"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCharge}>Calculate</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
