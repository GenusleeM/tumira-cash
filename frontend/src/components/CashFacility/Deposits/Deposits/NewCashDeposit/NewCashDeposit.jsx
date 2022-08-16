import "./NewCashDeposit.css";

import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  axiosInstance,
  cashaxiosInstance,
  smsInstance,
} from "../../../../../services/axios";
// import { cashaxiosInstance } from "../../../../../services/axios";
import Select from "react-select";
import { useSnackbar } from "notistack";

export default function NewCashDeposit() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState({});
  const [users, setUsers] = useState([]);
  const [charge, setCharge] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
    Charge();
  };
  const handleSearchChange = (e) => {
    setFormData({ ...formData, [e.id]: e.value.trim() });
    // console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);

    try {
      let response = await cashaxiosInstance.post("/cash/load", formData);

      if (response) {
        let success = response.data.success;

        if (success === "true") {
          enqueueSnackbar(response.data.message, {
            variant: "success",
          });
        } else {
          enqueueSnackbar(response.data.message, {
            variant: "warning",
          });
        }
        // check for the errors
      }
    } catch (error) {
      enqueueSnackbar(`${error.message}`, { variant: "error" });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(async () => {
    const response = await axiosInstance.get("/admin/getusers");
    let users = response.data.data.users;

    let customisedUsers = users.map((user) => ({
      value: user.email,
      label: user.firstname + " " + user.lastname,
      id: "clientId",
    }));
    setUsers(customisedUsers);
    const interval = setInterval(() => {
      setUsers(customisedUsers);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const Charge = async () => {
    try {
      let currentCharge = await cashaxiosInstance.get("/cashCharge/getCharge");
      //console.log(response);
      // console.log(response.data)
      // console.log(currentCharge.data.data.latestCharge.name);
      setCharge(currentCharge.data.data.latestCharge.name);

      if (currentCharge) {
        let success = currentCharge.data.success;
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

  // sending sms logic
  
  // SMS NOW SEND AT THE BACKEND

  // const sendMsg = async () => {
  //   try {
  //     const sms = await smsInstance.post("/sendMessage", {
  //       originator: "TUMIRACASH",
  //       destination: "263783783782",
  //       messageText: "TUMIRACASH: You have received USD154.00 from GENUSLEE MAPEDZE. Ref No: BRO-202205130800370001.",
  //       messageReference: "genREf",
  //       messageDate: "20220508085900",
  //       messageValidity: "03:00",
  //       sendDateTime: "09:00",
  //     });
  //     if (sms) {
  //       if (sms.data.success === true) {
  //         enqueueSnackbar(sms.data.message, {
  //           variant: "success",
  //         });
  //       } else {
  //         enqueueSnackbar(sms.data.message, {
  //           variant: "warning",
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     enqueueSnackbar(`${error.message}`, { variant: "error" });
  //   }
  // };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        style={{
          color: "white",
        }}
      >
        Load Cash Deposit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Load New Cash Deposit</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Please ensure that the client can only receive money{" "}
              <b>not greater than 300</b>. <b>LIMIT</b> per transaction is{" "}
              <b>USD300</b>.GIVE the client the reference number after deposit
              creation:
              <b className="charge">Current Charge is : {`${charge}`} %</b>
            </DialogContentText>

            <Select
              id="select_user"
              placeholder="Select Sender"
              name="clientId"
              className="myField"
              required
              onChange={handleSearchChange}
              options={users}
            />

            <div className="myField">
              <TextField
                className="field"
                id="bank"
                name="bank"
                label="Deposited At"
                variant="outlined"
                fullWidth
                required
                onChange={handleChange}
              />
            </div>
            <div className="myField">
              <TextField
                className="field"
                id="receiverName"
                name="receiverName"
                label="Receiver Full Name"
                type="tel"
                variant="outlined"
                fullWidth
                required
                onChange={handleChange}
                // helperText = "eg. Harare Cash Office"
              />
            </div>
            <div className="myField">
              <TextField
                className="field"
                id="receiverId"
                name="receiverId"
                label="Receiver Id Number"
                variant="outlined"
                fullWidth
                required
                onChange={handleChange}
                // helperText = "eg. Harare Cash Office"
              />
            </div>
            <div className="myField">
              <TextField
                className="field"
                id="reciverNumber"
                name="reciverNumber"
                label="Receiver Phone"
                variant="outlined"
                helperText="eg. 263783783782"
                fullWidth
                required
                onChange={handleChange}
                // helperText = "eg. Harare Cash Office"
              />
            </div>

            <div className="myField">
              <TextField
                className="field"
                id="amount"
                label="Amount"
                name="amount"
                variant="outlined"
                helperText="eg. 1234"
                fullWidth
                required
                onChange={handleChange}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Send
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
