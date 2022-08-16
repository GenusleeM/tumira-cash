import "./AllCashDeposits.css";
import { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

// import NewDeposit from './NewDeposit/NewDeposit';

import React from "react";
// import { deposits } from '../../utils/graphData'
import { deposits } from "../../../../utils/graphData";
import { Typography } from "@material-ui/core";
// import { axiosInstance } from '../../services/axios';
import { axiosInstance } from "../../../../services/axios";
import { cashaxiosInstance } from "../../../../services/axios";
import MaterialTable from "material-table";
import formartDate  from "../../../../utils/formatDate";
import numberFormat from "../../../../utils/CurrencyFormat";
import NewCashDeposit from "./NewCashDeposit/NewCashDeposit";

export default function AllCashDeposits() {
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let titleDate = `All deposits  as at ${date}`;
  const [orders, setOrders] = useState([]);
  const handleDelete = (id) => {
    setOrders(orders.filter((item) => item.id !== id));
  };
  useEffect( () => {
    let get_all_deposits = async () => {
      try {
        const response = await cashaxiosInstance.get(
          "/admin/cash/allCashDeposits"
        );
        // console.log(response.data.message);
        // console.log(response.data.data.cashDeposits);
        let deposits = response.data.data.cashDeposits;

        let customiseDeposits = deposits.map(function (deposit) {
          return {
            id: deposit._id,
            date:formartDate(deposit.createdAt),
            currency: deposit.currency,
            amount: numberFormat(deposit.amount),
            status: deposit.status,
            receiverName: deposit.receiverName,
            receiverId: deposit.receiverId,
            reciverNumber: deposit.reciverNumber,
            loadedBy: deposit.loaded_by,
            reference: deposit.reference,
            bank: deposit.bank,
            companyname: deposit.companyName,
            charge: deposit.charge,
            actualDepositAmount: numberFormat(deposit.actualDepositAmount),
            charged: numberFormat(deposit.chargeAmount),
          };
        });
        // console.log(customiseDeposits);
        setOrders(customiseDeposits);
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

  const columns = [
    //  { field: 'id',title: 'ID', width: 20,hidden:true },
    {
      field: "date",
      title: "Date & Time",
      width: 150,
    },
    {
      field: "companyname",
      title: "Sender Name",
      width: 150,
    },
    {
      field: "receiverName",
      title: "Receiver Name",
      width: 150,
    },
    {
      field: "receiverId",
      title: "Receiver ID Number",
      width: 150,
    },
    {
      field: "currency",
      title: "Ccy",
      width: 100,
    },
    {
      field: "actualDepositAmount",
      title: "DepositAmount",
      width: 150,
    },

    //     {
    //       field: 'charge',
    //     title: 'Charge(%)',
    //       width:150,

    //   },
      {
        field: 'charged',
      title: 'Charge',
        width:150,

    },

    {
      field: "amount",
      title: "Amt Collectable",
      width: 150,
    },
    {
      field: "status",
      title: "Status",
      //   description: 'This column has a value getter and is not sortable.',
      render: (params) => {
        return (
          <>
            <p className={params.status}>{params.status}</p>
          </>
        );
      },
    },

    {
      field: "loadedBy",
      title: "Loaded-By",
      //   description: 'This column has a value getter and is not sortable.',
      width: 200,
    },
    {
      field: "bank",
      title: "Bank",
      //   description: 'This column has a value getter and is not sortable.',
      width: 200,
    },
    {
      field: "reference",
      title: "Ref",
      //   description: 'This column has a value getter and is not sortable.',
      width: 100,
    },
    {
      field: "id",

      title: "Action",
      width: 150,
      render: (params) => {
        return (
          <>
            <Link to={"/updateCashDeposits/" + params.id}>
              <button className="editCashDeposit">Update</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="depositList">
      <div className="topPart">
        <div className="title">
          <Typography variant="h5">Cash Deposits</Typography>
        </div>
        <button className="addCashDeposit">
          <NewCashDeposit />
        </button>
      </div>

      <div className="bottomPart">
        <MaterialTable
          title={titleDate}
          data={orders}
          columns={columns}
          options={{
            maxBodyHeight: "60vh",
            pageSize: 5,
            exportButton: true,
            headerStyle: {
              backgroundColor: "#9b59b6",
              color: "#FFF",
              display: "fixed",
            },
          }}
        />
      </div>
    </div>
  );
}
