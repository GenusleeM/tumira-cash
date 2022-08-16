import { Button, TextField } from "@material-ui/core";
import { axiosInstance } from "../../../../services/axios";
import "./index.css";
import { useSnackbar } from "notistack";
import Select from "react-select";
import React, { useEffect, useState } from "react";

const Refund = ({ handleCloseRefundState, user }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({});
  const [price, setprice] = useState();

  const handleSearchChange = (e) =>{
    setFormData({ ...formData, [e.id]: e.value.trim() });
    console.log(formData)
  }
 
  const handlepricechange = (e) => {
    setprice(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    handleCloseRefundState();

    try {
      const response = await axiosInstance.post("/refund/create", {
        userId:user._id,
        amount: price,
      });
      if (response.data.success === true) {
        enqueueSnackbar("Refund Processed Successfully", { variant: "success" });
      } else {
        enqueueSnackbar(`Refund  Failed !! ${response.data.message}`, {
          variant: "warning",
        });
      }
    } catch (error) {
      enqueueSnackbar(`${error.message}`, { variant: "error" });
    }
  };

  useEffect(async () => {
  }, []);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="myField">
          <TextField
            type="number"
            sx={{ mt: "10px" }}
            className="field"
            id="price"
            name="bank"
            value={price}
            label="amount"
            variant="outlined"
            fullWidth
            required
            onChange={handlepricechange}
            onChange={(e) => setprice(parseFloat(e.target.value))}
            helperText="amount to be refunded"
          />
        </div>

        <div className="form-group  bottom_buttons">
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          <Button
            variant="contained"
            disableElevation
            color="secondary"
            onClick={handleCloseRefundState}
          >
            cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Refund;
