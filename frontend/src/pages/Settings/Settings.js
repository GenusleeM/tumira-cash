import Button from "@mui/material/Button";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import NewCashDeposit from "../../components/CashFacility/Deposits/Deposits/NewCashDeposit/NewCashDeposit";
import Login from "../../components/Login/Login";
import CashFee from "../../components/CashFacility/Setfee/CashFee";
import "./Settings.css";
import { BorderAllRounded } from "@material-ui/icons";
import Calculator from "../../components/Calculator/Calculator";


const Settings = () => {
  return (
    <div className="allsettings">
      <div className="topButtons">
        <Button
          variant="contained"
          style={{
            fontSize: "14px",
            marginRight: "20px",
            backgroundColor:"green",
            borderRadius:"5px",
            border:"none"
          }}
        >
          <CashFee />
        </Button>
        <Button
          variant="contained"
          style={{
            fontSize: "14px",
            marginRight: "20px",
            // backgroundColor:"green",
            borderRadius:"5px",
            border:"none"
          }}
        >
          <Calculator/>
        </Button>
      </div>
      <div className="widgets">
        <span className="smallWidget">
          {/* <WidgetSmall /> */}
        </span>
      </div>
    </div>
  );
};

export default Settings;
