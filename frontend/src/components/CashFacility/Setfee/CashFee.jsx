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
import { cashaxiosInstance } from "../../../services/axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import "./fee.css"
export default function CashFee() {
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({});
  const [odernumber, setodernumber] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
    Charge();
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      let valz = document.getElementById("percentage").value;
      // console.log(valz);

      let response = await cashaxiosInstance.post("/cashCharge/create", {
        percentage: valz,
      });
      //console.log(response);
      // console.log(response.data)
      // console.log(response.data.success)

      if (response) {
        let success = response.data.success;
        if (success === true) {
          enqueueSnackbar("New charge created", { variant: "success" });
        } else {
          enqueueSnackbar("Something went wrong, Charge not set", { variant: "warning" });
        }
        // check for the errors
      }
    } catch (error) {
      enqueueSnackbar(`${error.message}`, { variant: "error" });
    }
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
          // const prevcharge = feerepo.data.latestCharge.name
          // enqueueSnackbar('Found', { variant: "success" });
        } else {
          // enqueueSnackbar('Charge not set', { variant: "warning" });
        }
        // check for the errors
      }
    } catch (error) {
      enqueueSnackbar(`${error.message}`, { variant: "error" });
    }
  };
  return (
    <div>
      <MenuItem onClick={handleClickOpen}>Set Charge</MenuItem>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
      Open form dialog
    </Button> */}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Set Charge</DialogTitle>

        <DialogContent>
          <DialogContentText>
            <strong className="warning"> Warning!!! This is for Executives</strong>
          </DialogContentText>
          <br />
          <DialogContentText>
            Current Charge : {`${odernumber}`} %
          </DialogContentText>
          <DialogContentText>
            <br />
          </DialogContentText>
          <DialogContentText>Enter Percentage(%)</DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="percentage"
            label="percentage"
            type="percentage"
            fullWidth
            variant="standard"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
