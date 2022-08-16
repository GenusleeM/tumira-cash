import React from "react";
// import "./TransactionList.css";
import { useState ,useEffect} from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { orders } from "../../../utils/graphData.js";
import { cashaxiosInstance } from '../../../services/axios';


import { Button, Typography } from "@material-ui/core";
import MaterialTable from "material-table";
import numberFormat from "../../../utils/CurrencyFormat";
import formartDate from "../../../utils/formatDate";

const CashOrders = () => {
  const [orders, setOrders] = useState([]);
  const handleDelete = (id) => {
    setOrders(orders.filter((item) => item.id !== id));
  };
  useEffect(async () => {

    let get_all_orders = async () =>{
      try {
        const response = await cashaxiosInstance.get("/admin/cash/allOrders");
        let orders = response.data.data.cashDeposits;
        // console.log(orders)
  
        let customisedOrders = orders.map((order) => ({
          ...order,
          id: order._id,
          orderId:order.order_id,
          companyName: order.company_name,
          orderDate:  formartDate( order.createdAt),
          // orderExecutedDate: formartDate(order.order_executed_date),
          // price:numberFormat(order.price),
          order_amount: numberFormat(order.amount),
          // quantityOrdered:order.quantity,
          // quantityCollected:order.quantity_fuelled_up,
          // amountFueled:numberFormat(order.amount_fueled), 
          order_status: order.order_status,
          order_collection_office: order.order_collection_office,
          driver: order.driver,
          truck: order.truck,
          trailer: order.trailer,

        }));
        setOrders(customisedOrders);
      } catch (error) {
        console.log(error);
      }
    }
    get_all_orders();
    const interval=setInterval(()=>{
      get_all_orders()
     },10000)
       
       
     return()=>clearInterval(interval)
    
  }, []);

  const columns = [
    { field: "id", title: "ID", width: 90 , hidden:true },
    {field:"orderId",title:"OrderID"},
    {
      field: "companyName",
      title: "Company Name",
    },
    {
      field: "orderDate",
      title: "Order Placed",
      //   description: 'This column has a value getter and is not sortable.',
      width: 200,
    },
    {
      field: "order_amount",
      title: "Amount",
      width: 150,
    },

    {
      field: "order_status",
      title: "Status",
      render: (params) => {
        return (
          <> 
          <p 
          className = {params.order_status}
          >
          {params.order_status}
          </p>
          
          </>
        
        );
      },
    },
    {
      field: "order_collection_office",
      title: "Collection Office",
      width: 150,
    },
    {
      field: "driver",
      title: "Truck/Driver",

    },
    {
      field: "truck",
      title: "Truck",
    },
    {
      field: "trailer",
      title: "Trailer",
    },

    {
      field: "action",
      title: "Action",
      width:150,
      render: (params) => {
        return (
          <>
            <Link to={"/cashOrder/" + params.order_id}>
              <Button  color = "primary"className="editOrder" variant = "outlined">Edit</Button>
            </Link>

            {/* <DeleteOutlinedIcon
              className="deleteOrder"
              onClick={() => handleDelete(params.id)}
            /> */}
          </>
        );
      },
    },
    {
      // field: "proofURL",
      // title: "Proof",
      // width:150,
      render: (params) => {
        return (
          <>
            {/* <Link to={{ pathname: `${params.proofURL}` }} target="_blank" >
            <button variant="outlined" color = "primary" >
              View proof
            </button>
          </Link> */}

            {/* <DeleteOutlinedIcon
              className="deleteOrder"
              onClick={() => handleDelete(params.id)}
            /> */}
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <div className="topPart">
        <div className="title">
          <Typography variant="h5">Cash Orders</Typography>
        </div>
        <button className="addDeposit btn "> Add New Order</button>
      </div>
      <div className = "bottomPart">
        <MaterialTable
        title="All Orders as at :25/09/21"
          
          data={orders}
          disableSelectionOnClick
          
          columns={columns}
          options={{
            pageSize:5,
              exportButton: true,
              maxBodyHeight:"60vh",
              headerStyle: {
                backgroundColor: '#525c6b',
               //backgroundColor: '#bf6a50',
                color: '#FFF',
                display:"fixed"
             }
          }}
        />

      </div>
      
    </div>
  );
};

export default CashOrders;
