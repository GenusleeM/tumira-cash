import MUIDataTable from 'mui-datatables';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { axiosInstance } from '../../services/axios';
import numberFormat from '../../services/CurrencyFormat';

import formartDate from '../../services/formatDate';


const columns = [
    {
      name: "date",
      label: "Date",
      print: true,
      options: {
        filter: false,
        sort: false,
      },
    },
  
    {
      name: "description",
      label: "Description",
      print: true,
      options: {
        filter: false,
        print: true,
        sort: false,
      },
    },
    {
      name: "quantity",
      label: "Quantity",
      print: true,
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "unitprice",
      label: "Unit Price",
      print: true,
      options: {
        filter: true,
        sort: false,
      },
    },
    
    {
      name: "deposit",
      label: "Deposit",
      print: true,
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "reference",
      label: "Reference",
      print: true,
      options: {
        filter: true,
        sort: false,
      },
    },
    {
        name: "order",
        label: "Order",
        print: true,
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "balance",
        label: "Balance",
        print: true,
        options: {
          filter: false,
          sort: false,
        },
      },
    
  ];
  const options = {
    filterType: "checkbox",
    responsive: "standard",
    selectableRows: "none",
    fixedHeader: true,
    fixedSelectColumn: true,
    rowsPerPage: 10,
    tableBodyHeight: "400px",
    downloadOptions: {
      filename: "DavidTZirima.csv",
    },
  };

const RealStatement = () => {
  const [statement, setstatement] = useState()
  useEffect(() => {
    let get_trx_statement = async () =>{
        try {
            const trxn_response =  await axiosInstance.get("/reports/account_statement")
            let  my_trx = trxn_response.data.data.statement
            let customised_trxn = my_trx.map( function(trxn){
              let my_deposit =trxn.deposit
              let my_order= trxn.order

              if(my_deposit !== undefined){
                my_deposit=numberFormat(trxn.deposit)
              }
              if(my_order!== undefined){
                my_order=numberFormat(trxn.order)
              }
              
              

              return{
              ...trxn,
              date:formartDate(trxn.date),
              deposit:my_deposit,
              order:my_order,
              balance:numberFormat(trxn.balance),
              unitPrice:"jsjsjn",
              quantity:22
              }
            })
  
            setstatement(customised_trxn)
         
            } catch (error) {
              console.log(error.message)
      
            }
    }
    get_trx_statement();
    const interval=setInterval(()=>{
      get_trx_statement()
     },10000)
       
       
     return()=>clearInterval(interval)
  }, [])
  
    return (
        <div className = "mainReports">
        <MUIDataTable
          title={"Client Name Account Statement as at 25/09/21"}
          data={statement}
          columns={columns}
          options={options}
        />
      </div>
    )
}

export default RealStatement
