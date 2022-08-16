import React from "react";
import "./FeatureInfor.css";
import NumberFormat from 'react-number-format';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { cashaxiosInstance } from "../../services/axios";
import numberFormat from "../../utils/CurrencyFormat";
const FeatureInfor = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [orders, setOrders] = useState([]);
  const [cash, setCash] = useState();
  const [ourCash, setOurCash] = useState();
  const [pending_money, setPendingMoney] = useState([]);

  const handleDelete = (id) => {
    setOrders(orders.filter((item) => item.id !== id));
  };
  useEffect( () => {
    let get_all_deposits = async () => {
      try {
        const response = await cashaxiosInstance.get(
          "/admin/cash/statistics"
        );

        setCash(response.data.data.totalDeposited[0].TotalAmount.toFixed(2));
        console.log(response.data.data.totalDeposited[0].TotalAmount);
        setOurCash(response.data.data.totalDeposited[0].TotalCommission.toFixed(2));
        let res = await cashaxiosInstance.get("/cash/total");
        setPendingMoney(res.data.data.pendingMoney[0].TotalPendingAmount.toFixed(2));
        console.log(res.data.data.pendingMoney[0].TotalPendingAmount);

      } catch (error) {
        console.log(error);
      }
    };
    get_all_deposits();
    const interval=setInterval(()=>{
      get_all_deposits()
     },10000)
       
       
     return()=>clearInterval(interval)
  }, []);




  return (
    <div className="featured">
      <div className="featureItem">
        <span className="featuredTitle">Total Deposited Cash</span>
        <div className="featureContainer">
          {/* <span className="total">USD$ {`${cash}`}</span> */}
          <span className="total"><NumberFormat value={`${cash}`} thousandSeparator={true} prefix={'USD$ '} displayType={'text'}/></span>

          <span className="Rate">
            <LocalAtmIcon className="featureIcon featureIcon-positive" />
          </span>
        </div>
      </div>
      <div className="featureItem">
        <span className="featuredTitle">Total Commission</span>
        <div className="featureContainer">
          {/* <span className="total">USD {numberFormat(`${ourCash}`)}</span> */}
          <span className="total"><NumberFormat value={`${ourCash}`} thousandSeparator={true} prefix={'USD$ '} displayType={'text'}/></span>
          <span className="Rate">
            <LocalAtmIcon className="featureIcon featureIcon-positive" />
          </span>
        </div>
      </div>

      <div className="featureItem">
        <span className="featuredTitle">Total Pending Collection </span>
        <div className="featureContainer">
          {/* <span className="total">USD {numberFormat(`${pending_money}`)}</span> */}
          {`${pending_money}` ? (
            <span className="total">
              <NumberFormat
                value={`${pending_money}`}
                thousandSeparator={true}
                prefix={"USD$ "}
                displayType={"text"}
              />
            </span>
          ) : (
            <span className="total">
              <NumberFormat
                value={0.00}
                thousandSeparator={true}
                prefix={"USD$ "}
                displayType={"text"}
              />
            </span>
          )}

          <span className="Rate">
            <MoneyOffIcon className="featureIcon featureIcon-positive" />
          </span>
        </div>
      </div>

    </div>
  );
};

export default FeatureInfor;
