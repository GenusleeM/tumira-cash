import React, { useEffect } from 'react'
import { useState } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import {Link} from 'react-router-dom'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { userData} from "../../utils/graphData.js"
import { Button, Typography } from '@material-ui/core';

import './UserList.css'
import { axiosInstance } from '../../services/axios.js';
import numberFormat from '../../utils/CurrencyFormat.js';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const handleDelete = (id) =>{
        setUsers(users.filter((item) => item.id !== id));
    }
    useEffect(  () => {
      let get_all_users = async () =>{
        try {
          const response =  await axiosInstance.get("/admin/getusers")
        let users = response.data.data.users
        // console.log(response.data)
      
  
        let customisedUsers = users.map(user =>({
          id:user._id,
          userName:`${user.firstname}`+" "+ `${user.lastname}`,
          id_number:user.id_number,
          email:user.email,
          status:user.status,
          phone:user.phone,
          balance : numberFormat(user.cashBalance),
  
        }))
        setUsers(customisedUsers)
          
        } catch (error) {
          console.log(error)
          
        }

      }
      get_all_users();
      const interval=setInterval(()=>{
        get_all_users()
       },10000)
         
         
       return()=>clearInterval(interval)
        
      }, [])
    const columns = [
      {
        field: 'id',
        headerName: 'CLIENT ID',
        width: 220,
        headerClassName: 'headerTitleUserList',
        headerAlign: 'center',
       
      },

        {
          field:'userName',
          headerName: 'Username',
          width: 150,
          headerClassName: 'headerTitleUserList',
          headerAlign: 'center',
         
        },
        {
          field: 'email',
          headerName: 'Email Address',
          width: 200,
          headerClassName: 'headerTitleUserList',
          headerAlign: 'center',

         
        },
        {
          field: 'phone',
          headerName: 'Phone Number',
          width: 200,
          headerClassName: 'headerTitleUserList',
          headerAlign: 'center',
         
        },
        {
          field: 'id_number',
          headerName: 'Id Number',
          width: 200,
          headerClassName: 'headerTitleUserList',
          headerAlign: 'center',
         
        },
      
        {
          field: 'balance',
          headerName: 'Balance',
          description: 'Add some custome description here.',
          width: 150,
          headerClassName: 'headerTitleUserList',
          headerAlign: 'center',
        },
 
        // {
        //     field:"action",
        //     headerName:"Diesel",
        //     width:150,
        //     renderCell:(params)=>{
        //         return(
        //             <>
        //                 <Link to = {"/user/"+params.row.id}>
        //                     <button className = "editUser">View</button>
        //                 </Link>
                        
        //                 {/* <DeleteOutlinedIcon 
        //                 className = "deleteUser" 
        //                 onClick = {
        //                     () => handleDelete(params.row.id)
        //                     }
        //                     /> */}
        //             </>
        //         )
        //     },
        // },
        {
          field:"status",
          headerName:"Reports",
          width:150,
          headerClassName: 'headerTitleUserList',
          headerAlign: 'center',
          renderCell:(params)=>{
              return(
                  <>
                      <Link to = {"/cashStatement/"+params.row.id}>
                          <button className = "editUser">Report</button>
                      </Link>
                      
                      {/* <DeleteOutlinedIcon 
                      className = "deleteUser" 
                      onClick = {
                          () => handleDelete(params.row.id)
                          }
                          /> */}
                  </>
              )
          },
      }
      ];
    return (

        <div className = "userList">
            <div className="topPart"> 
                <div className="title">
                    <Typography variant ="h5">All Clients</Typography>
                </div>
                <Link to = "/newUser">
                    <button className="addNewClient">Add New User</button>
                </Link>
                
                
            </div>
            <DataGrid
                rows={users}
                disableSelectionOnClick
                columns={columns}
                pageSize={20}
            />
            
        </div>
    )
}

export default UserList
