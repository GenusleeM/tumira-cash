import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from 'axios'
import "./index.css";
import { axiosInstance } from "../../services/axios";

const AccountStatement = ({user,trnx}) => {


  return (

    <div>
      <MaterialTable
        title= { `Statement of Accounts :${user.userId}`}
        columns={[
          { title: "Date", field: "date",sorting:false},
          { title: "Description", field: "description" ,sorting:false},
          { title: "Unit Price ($)", field: "unitPrice",sorting:false },
          { title: "Quantity", field: "quantity",sorting:false },
          { title: "Deposit", field: "deposit",sorting:false },
          { title: "Reference", field: "reference",sorting:false },
          { title: "Order", field: "order",sorting:false },
          { title: "Balance", field: "balance",sorting:false },
        ]}
        data={trnx}
        options={{
          search: true,
          exportButton: true,
          sorting: true,
        }}
      />
    </div>
  );
};

export default AccountStatement;
