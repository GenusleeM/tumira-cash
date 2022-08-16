import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from 'axios'
import { axiosInstance } from "../../../services/axios";

const Statement = ({user,trnx}) => {

  return (

    <div>
      <MaterialTable
        title= { `Statement of Accounts :${user.firstname+" "+ user.lastname}`}
        columns={[
          { title: "Date", field: "date",sorting:false},
          { title: "Description", field: "description" ,sorting:false},
          { title: "Receiver Name", field: "receiverName",sorting:false },
          { title: "Receiver Id", field: "receiverId",sorting:false },
          { title: "Receiver Phone Number", field: "reciverNumber",sorting:false },
           { title: "Reference", field: "reference",sorting:false },
          { title: "Charge", field: "charge",sorting:false },
          // { title: "Order", field: "order",sorting:false },
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

export default Statement;
