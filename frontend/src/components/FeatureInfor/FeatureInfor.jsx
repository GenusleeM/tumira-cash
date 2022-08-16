import React from "react";
import "./FeatureInfor.css";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import { useEffect, useState } from "react";
import { cashaxiosInstance } from "../../services/axios";
import { useSnackbar } from "notistack";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GroupIcon from "@mui/icons-material/Group";
import numberFormat from "../../utils/CurrencyFormat";

const FeatureInfor = () => {
const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [total, setTotal] = useState([]);
  const [pending, setPending] = useState([]);
  const [complete, setComplete] = useState([]);
  const [total_users, setUsers] = useState([]);

  useEffect( () => {
    const Statistics = async () => {
      try {
        let response = await cashaxiosInstance.get("/cash/total");
        // console.log(response);
        // console.log(response.data);
        setTotal(response.data.data.total);
        setPending(response.data.data.pendingDeposits);
        setComplete(response.data.data.completeDeposits);


        const total_response =  await cashaxiosInstance.get("/admin/getusers")
        setUsers(total_response.data.totalUsers);
        // console.log(total_response.data.totalUsers);
        if (response) {
          let success = response.data.success;
          if (success === true) {
            // const prevcharge = response.data.latestCharge.name
            // enqueueSnackbar('Found', { variant: "success" });
          } else {
            // enqueueSnackbar('Charge not set', { variant: "warning" });
          }
          // check for the errors
        }
      } catch (error) {
        // enqueueSnackbar(`${"Reload,, there was an error whilst connecting to the database"}`, { variant: "error" });
      }
    };
      Statistics();
      const interval=setInterval(()=>{
        Statistics()
       },10000)
         
         
       return()=>clearInterval(interval)

  }, []);

  return (
    <div className="featured">
      <div className="featureItem">
        <span className="featuredTitle">Number Of Customers</span>
        <div className="featureContainer">
          <span className="total">{`${total_users}`}</span>
          <span className="Rate">
            <GroupIcon className="featureIcon featureIcon-positive" />
          </span>
        </div>
      </div>
      <div className="featureItem">
        <span className="featuredTitle">Total Deposits</span>
        <div className="featureContainer">
          <span className="total">{`${total}`} </span>
          <span className="Rate">
            <CurrencyExchangeIcon className="featureIcon featureIcon-positive" />
          </span>
        </div>
      </div>

      <div className="featureItem">
        <span className="featuredTitle">Complete Deposits</span>
        <div className="featureContainer">
          <span className="total"> {`${complete}`}</span>
          <span className="Rate">
            {" "}
            <AttachMoneyIcon className="featureIcon" />
          </span>
        </div>
      </div>

      <div className="featureItem">
        <span className="featuredTitle">Pending Deposits</span>
        <div className="featureContainer">
          <span className="total">{`${pending}`}</span>
          <span className="Rate">
            <AttachMoneyIcon className="featureIcon featureIcon-positive" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeatureInfor;
