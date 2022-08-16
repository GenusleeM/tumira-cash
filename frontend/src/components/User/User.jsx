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
import "./User.css";
import Phone from "@material-ui/icons/Phone";
import LocationSearching from "@material-ui/icons/LocationSearching";
import { axiosInstance } from "../../services/axios";
import AccountStatement from "../AccountStatement/AccountStatement";

import AddIcon from "@material-ui/icons/Add";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import PriceForm from "./NewUser/PriceForm/PriceForm";
import formartDate from "../../utils/formatDate";
import numberFormat from "../../utils/CurrencyFormat";
import CreditLimit from "./NewUser/CreditLimit/CreditLimit";
import Refund from "./NewUser/Refund/Refund";

function User() {
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


  useEffect(async () => {
    let get_user_details = async () => {
      try {
        let responce = await axiosInstance.post("/admin/getuser", { userid });
        // console.log(responce)
        setUser(responce.data.data.user);

        // get user transactions
        const response = await axiosInstance.get("/reports/account_statement", { params: { userId: userid } });
        let user_transactions = response.data.data.statement;
        let customised_trxn = user_transactions.map( function(trxn){
          let my_deposit =trxn.deposit
          let my_order= trxn.order
          let my_date =trxn.date
          let my_balance =trxn.balance

          if(my_deposit !== undefined){
            my_deposit=numberFormat(trxn.deposit)
          }
          if(my_order!== undefined){
            my_order=numberFormat(trxn.order)
          }
          if(my_date!== undefined){
            my_date=formartDate(trxn.date)
          }
          if(my_balance!== undefined){
            my_balance=numberFormat(trxn.balance)
          }
          return{
          ...trxn,
         // date:formartDate(trxn.date),
          deposit:my_deposit,
          order:my_order,
         // balance:numberFormat(trxn.balance)
          
          }
        })

    
        setTrnx(customised_trxn);
      } catch (error) {
        console.log(error);
      }
    };
    get_user_details();
    const interval=setInterval(()=>{
      get_user_details()
     },10000)
       
       
     return()=>clearInterval(interval)
  }, []);

  return (
    <>
      <div className="user1">
        <h3 className="userTitle user1Option">User Details</h3>
        <Link to="/newUser">
          <button className="addUser">Create</button>
        </Link>
      </div>

      <div className="userContainer">
        <div className="userShow">
          <div className="userTop">
            <Avatar />
            <div className="userNameTitle">
              <span className="name">
                {" "}
                {user.firstname} <spna> {user.lastname}</spna>{" "}
              </span>
              <span className="nameTitle"> Owner</span>
            </div>
          </div>

          <div className="userShowDetails">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfor">
              <PermIdentityIcon className="userShowIcon" />
              <span className="userShowInfoTitle"> {user.companyname}</span>
            </div>
            <div className="userShowInfor">
              <CalendarTodayIcon className="userShowIcon" />
              <span className="userShowInfoTitle"> {formartDate(user.joinDate)} </span>
            </div>

            <span className="userShowTitle">Credit Limit</span>
            <div className="userShowInfor">
            <Button
                variant="contained"
                color="primary"
                endIcon={<AddIcon />}
                onClick={handleopenCreditState}
              >
                set Credit Limit
                
              </Button>

              <span className="userShowInfoTitle">
              <Box
                  sx={{
                    color: "text.primary",
                    fontSize: 20,
                    fontWeight: "medium",
                  }}
                >
                 {numberFormat(user.creditLimit)}
                </Box>
                
                 </span>
            </div>
            
            <span className="userShowTitle">Account Balance</span>
            <div className="balancecontainer">
              <div className="balanceitem balanceitem_with_lft_bd">
                <Typography>Actual</Typography>
                <Box
                  sx={{
                    color: "text.primary",
                    fontSize: 20,
                    fontWeight: "medium",
                  }}
                >
                  {
                    numberFormat(user.balance)
                  }
                </Box>
              </div>
              <div className="balanceitem balanceitem_with_lft_bd">
                <Typography>Available</Typography>
                <Box
                  sx={{
                    color: "text.primary",
                    fontSize: 20,
                    fontWeight: "medium",
                  }}
                >
                  {
                    numberFormat((user.balance) + (user.creditLimit)-(user.allocated))
                  }
                </Box>
              </div>
              <div className="balanceitem ">
                <Typography>Allocated</Typography>
                <Box
                  sx={{
                    color: "text.primary",
                    fontSize: 20,
                    fontWeight: "medium",
                  }}
                >
                  {numberFormat(user.allocated)}
                </Box>
              </div>
            </div>
            <span className="userShowTitle">Custome Price</span>
            <div className="userShowInfor">
              <Button
                variant="contained"
                color="primary"
                endIcon={<AddIcon />}
                onClick={handleopenPriceState}
              >
                Set Price
              </Button>
              
            </div>
            <span className="userShowTitle">Refund</span>
            <div className="userShowInfor">
              <Button
                variant="contained"
                color="primary"
                endIcon={<AddIcon />}
                onClick={handleopenRefundState}
              >
                Refund
              </Button>
              
            </div>
          </div>
          <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfor">
              <Phone className="userShowIcon" />
              <span className="userShowInfoTitle"> {user.phone}</span>
            </div>
            <div className="userShowInfor">
              <MailOutlineIcon className="userShowIcon" />
              <span className="userShowInfoTitle"> {user.email}</span>
            </div>

            <div className="userShowInfor">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle"> {user.address}</span>
            </div>
            
        </div>

        <div className="userUpdate">
          <AccountStatement trnx={trnx} user={user} />

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
      </div>
    </>
  );
}

export default User;
