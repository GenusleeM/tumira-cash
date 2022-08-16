import { Button, TextField } from "@material-ui/core";
import { axiosInstance } from "../../../../services/axios";
import { cashaxiosInstance } from "../../../../services/axios";
import "./index.css";
import { useSnackbar } from "notistack";
import Select from "react-select";
import React, { useEffect, useState } from "react";

const PriceForm = ({ handleClosePriceState, user }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [office, setoffice] = useState();
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
    handleClosePriceState();

    try {
      const response = await axiosInstance.post("/price/create", {
        companyId:user._id,
        companyName: user.companyname,
        price: price,
        ...formData
      });
      if (response.data.success === true) {
        enqueueSnackbar("Price Suceessfully Created", { variant: "success" });
      } else {
        enqueueSnackbar(`creation Failed !! ${response.data.message}`, {
          variant: "warning",
        });
      }
    } catch (error) {
      enqueueSnackbar(`${error.message}`, { variant: "error" });
    }
  };

  useEffect(async () => {
    let getOffices = async () => {
      const response = await axiosInstance.get("/fuelingSite/getFuelingSite");
      let offices = response.data.data.site;

      let customisedOffices = offices.map((office) => ({
        value: office.name,
        label: office.name,
        id: "collectionOffice",
      }));
      setoffice(customisedOffices);
    };
    getOffices();
  }, []);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <Select
          id="select_user"
          placeholder="Select Fuelling Site"
          name="clientId"
          className="myField"
          onChange ={handleSearchChange}
          options={office}
        />

        <div className="myField">
          <TextField
            type="number"
            sx={{ mt: "10px" }}
            className="field"
            id="bank"
            name="bank"
            value={price}
            label="price"
            variant="outlined"
            fullWidth
            required
            onChange={handlepricechange}
            onChange={(e) => setprice(parseFloat(e.target.value))}
            helperText="in dollar eg 0.99"
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
            onClick={handleClosePriceState}
          >
            cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PriceForm;
