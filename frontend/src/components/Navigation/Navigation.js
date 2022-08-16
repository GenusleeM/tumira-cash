import React from 'react'
import { useState } from 'react'
import Logo from "../../logo192.png"
import Drawer from '@material-ui/core/Drawer'
import './Navigation.css'
import { Avatar, Badge, Icon, IconButton, List } from '@material-ui/core'
import MenuItem from  '../MenuItem/MenuItem'
import routes from '../../routes/Routes'
import { makeStyles } from 'react'


// Assets
//TO Do import logo and use it accordingly
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';




const Navigation = () => {

    const [open, setOpen] = useState(true);
    const toggleNavigation = () =>{
        setOpen(!open)
    }
    return (
        <div>
            <Drawer
            classes ={
                {
                    paper:open ?"navigationDrawerCollapse":"navigationDrawer"
                } 
            }
            // className =  {{paper :( open ? "navigationDrawer" :"navigationDrawerCollapse")}}
            open= {open} 
            variant="permanent"
            
            >
                <div className = "navigationToolBar">
                    <IconButton onClick = {toggleNavigation}>
                        {open ? <MenuOutlinedIcon/>:<ChevronLeftIcon/> }
                        

                    </IconButton>
                </div>
                <div className = "navigationLogoContainer">

                {/* <img 
                src = {Logo} 
                alt ="Kamili Investments"
                className= "navigationLogo"
                ></img> */}
                <IconButton>
                    <Avatar>
                        TC
                    </Avatar>
                </IconButton>
                

                </div>
                <List className = "navigationList">
                    {routes.map((route,index) =>{
                        
                        return(
                            <>
                            {route.path === "/sign-out" &&(
                                <div className = "navigationSpacer">
                                </div>
                            )}

                            <MenuItem 
                                label = {route.label}
                                icon = {route.icon}
                                iconActive = {route.activeIcon}
                                path ={route.path}
                             />
                             </>

                        )
                    

                    })}
                    

                </List>
            </Drawer>
            
        </div>
    )
}

export default Navigation
