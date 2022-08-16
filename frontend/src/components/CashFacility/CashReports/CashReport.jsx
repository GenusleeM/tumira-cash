import React, { useEffect, useState } from "react";
import {
  useParams,
  useLocation,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

import { Link } from "react-router-dom";

import MailOutlineIcon from "@material-ui/icons/MailOutline";
//import "./User.css";
import Phone from "@material-ui/icons/Phone";
import LocationSearching from "@material-ui/icons/LocationSearching";
import { axiosInstance } from "../../../services/axios";
import { cashaxiosInstance } from "../../../services/axios";
import AccountStatement from "../../AccountStatement/AccountStatement";
import Statement from "../CashReports/Statement";

import AddIcon from "@material-ui/icons/Add";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import PriceForm from "../../User/NewUser/PriceForm/PriceForm";
import formartDate from "../../../utils/formatDate";
import numberFormat from "../../../utils/CurrencyFormat";
import CreditLimit from "../../User/NewUser/CreditLimit/CreditLimit";
import Refund from "../../User/NewUser/Refund/Refund";

function Cashuser() {
  let params = useParams();

  const [userid, setUserid] = useState(params.userid);
  const [user, setUser] = useState({});
  const [trnx, setTrnx] = useState([]);

  const [priceState, setPriceState] = useState(false);
  const handleopenPriceState = () => {
    setPriceState(true);
  };
  const handleClosePriceState = () => {
    setPriceState(false);
  };

  /// handling the custome credit limit dialog
  const [creditState, setCreditState] = useState(false);
  const handleopenCreditState = () => {
    setCreditState(true);
  };
  const handleCloseCreditState = () => {
    setCreditState(false);
  };

  /// handling refund  popup
  const [refundState, setRefundState] = useState(false);
  const handleopenRefundState = () => {
    setRefundState(true);
  };
  const handleCloseRefundState = () => {
    setRefundState(false);
  };

  useEffect(() => {
    let get_user_details = async () => {
      try {
        let responce = await axiosInstance.post("/admin/getuser", { userid });
        // console.log(responce)
        setUser(responce.data.data.user);

        // get user transactions
        const response = await cashaxiosInstance.get(
          "/cashReports/account_statement",
          { params: { userId: userid } }
        );
        let user_transactions = response.data.data.statement;
        console.log(response.data.data.statement);
        let customised_trxn = user_transactions.map(function (trxn) {
          let my_deposit = trxn.actualDepositAmount;
          let my_order = trxn.order;
          let my_charge = trxn.charge;
          let charged = trxn.actualDepositAmount - trxn.deposit;

          if (my_deposit !== undefined) {
            my_deposit = numberFormat(trxn.actualDepositAmount);
          }
          if (my_order !== undefined) {
            my_order = numberFormat(trxn.order);
          }
          // if(my_charge!== undefined){
          //   my_charge=numberFormat(trxn.charge)
          // }
          if (my_charge !== undefined) {
            my_charge = numberFormat(charged);
          }

          return {
            ...trxn,
            date: formartDate(trxn.createdAt),
            deposit: my_deposit,
            receiverName: trxn.receiverName,
            reciverNumber: trxn.reciverNumber,
            receiverId: trxn.receiverId,
            balance: numberFormat(trxn.balance),
            charge: numberFormat(trxn.chargeAmount),
            //charge:charged
          };
        });

        setTrnx(customised_trxn);
      } catch (error) {
        console.log(error);
      }
    };
    get_user_details();
    const interval = setInterval(() => {
      get_user_details();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="userUpdate">
        <Statement trnx={trnx} user={user} />

        <Dialog
          open={priceState}
          onClose={handleopenPriceState}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <DialogTitle id="form-dialog-title">
              custome price for: {user.companyname}
            </DialogTitle>
            <PriceForm
              handleClosePriceState={handleClosePriceState}
              user={user}
            />
          </DialogContent>
        </Dialog>

        <Dialog
          open={creditState}
          onClose={handleopenCreditState}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <DialogTitle id="form-dialog-title">
              credit Limit for: {user.companyname}
            </DialogTitle>
            <CreditLimit
              handleCloseCreditState={handleCloseCreditState}
              user={user}
            />
          </DialogContent>
        </Dialog>

        <Dialog
          open={refundState}
          onClose={handleopenRefundState}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <DialogTitle id="form-dialog-title">
              Refund : {user.companyname}
            </DialogTitle>
            <Refund
              handleCloseRefundState={handleCloseRefundState}
              user={user}
            />
          </DialogContent>
        </Dialog>

        {/* <span className="userEditTitle">Edit</span>
                    <form action="" className="userUpdateForm"> 
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label htmlFor=""> UserName</label>
                                <input 
                                    type ="text" 
                                    placeholder = " David  T Zirima" 
                                    className= "userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label htmlFor=""> Full Name</label>
                                <input 
                                    type ="text" 
                                    placeholder = " David  T Zirima" 
                                    className= "userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label htmlFor=""> Email</label>
                                <input 
                                    type ="text" 
                                    placeholder = "dzirima@fanset.net" 
                                    className= "userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label htmlFor=""> Phone</label>
                                <input 
                                    type ="text" 
                                    placeholder = "+263 220 5625" 
                                    className= "userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label htmlFor=""> Address</label>
                                <input 
                                    type ="text" 
                                    placeholder = "Number 5 luveve Byo" 
                                    className= "userUpdateInput"
                                />
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <div className = "rightProfile">
    
                                        <Avatar className = "myAvator"/>
                            
                                        <label htmlFor="file"> 
                                            <PublishIcon className= "chooseFileIcon"/>
                                        </label>
                                    <input type = "file" id = "file" className ="chooseFile"/>
                                </div>
                            </div>
                            <button className="userUpdateButton">Update</button>
                        </div>
                    </form> */}
      </div>
    </>
  );
}

export default Cashuser;
