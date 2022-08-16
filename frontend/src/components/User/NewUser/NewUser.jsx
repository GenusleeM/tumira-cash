import React, { useState } from "react";
import "./NewUser.css";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { axiosInstance } from "../../../services/axios";
import { useSnackbar } from "notistack";

const NewUser = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axiosInstance.post("/auth/register", formData);
      if (response) {
        let success = response.data.success;
        console.log(response.data);
        if (success === "true") {
          enqueueSnackbar("User Creation was successful", {
            variant: "success",
          });
        } else {
          enqueueSnackbar("User with that phone number already exist!!!", {
            variant: "warning",
          });
        }
        // check
      }
    } catch (error) {
      enqueueSnackbar(`${error.message}`, { variant: "error" });
    }
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Client</h1>
      <form action="" className="newUserform" onSubmit={handleSubmit}>
        <div className="newUserItem">
          <TextField
            variant="outlined"
            label="Email address"
            name="email"
            required
            fullWidth
            onChange={handleChange}
          />
        </div>

        <div className="newUserItem">
          <div className="newUserPassword">
            <TextField
              variant="outlined"
              label="Password"
              name="password"
              required
              onChange={handleChange}
              // fullWidth
            ></TextField>

            <TextField
              variant="outlined"
              label="Repeat Password"
              name="password"
              onChange={handleChange}
              // fullWidth
            ></TextField>
          </div>
        </div>

        <div className="newUserItem">
          {/* <label htmlFor=""> Company Name</label> */}
          <TextField
            variant="outlined"
            label="Id Number"
            name="id_number"
            onChange={handleChange}
            required
          />
        </div>

        <div className="newUserItem">
          <div className="newUserPassword">
            <TextField
              variant="outlined"
              label="Name"
              name="firstname"
              required
              onChange={handleChange}
              // fullWidth
            ></TextField>
            <TextField
              variant="outlined"
              name="lastname"
              label="Surname"
              onChange={handleChange}
              // fullWidth
            ></TextField>
          </div>
        </div>

        <div className="newUserItem">
          {/* <label htmlFor=""> Phone (+263 785 5214)</label> */}
          <TextField
            variant="outlined"
            type="tel"
            autoComplete="false"
            onChange={handleChange}
            label="Phone"
            name="phone"
          ></TextField>
        </div>
        <div className="newUserItem">
          {/* <label htmlFor=""> Address </label> */}
          <TextField
            type="text"
            variant="outlined"
            label="Address"
            name="address"
            onChange={handleChange}
          ></TextField>
        </div>
        <div className="newUserItem">
          <FormControl component="fieldset">
            <FormLabel component="legend"> Role</FormLabel>
            <RadioGroup
              row
              aria-label="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <FormControlLabel
                value="admin"
                control={<Radio />}
                label="Admin"
              />
              {/* <FormControlLabel
                value="truckowner"
                control={<Radio />}
                label="Truck Owner"
              /> */}
              <FormControlLabel value="user" control={<Radio />} label="User" />
              {/* <FormControlLabel value="office" control={<Radio />} label="Office" /> */}
            </RadioGroup>
          </FormControl>
        </div>

        <div className="newUserItem">
          <div className="userButton">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{
                color: "white",
                backgroundColor: "#8e44ad",
                fontSize:"15px"
              }}
            >
              Create User
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewUser;
