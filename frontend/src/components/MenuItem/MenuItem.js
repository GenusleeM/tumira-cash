import React from 'react'
import { ListItem ,ListItemIcon,ListItemText,Icon} from '@material-ui/core'
import { useState ,useEffect} from 'react'
import clsx from 'clsx'

// internal
import './MenuItem.css'
import { height } from '@material-ui/system'
import { Link ,useLocation} from 'react-router-dom'


const MenuItem = ({label, icon,iconActive,path}) => {

    const [active, setActive] = useState(true)
    const location = useLocation()
    
    useEffect(()=>{
        if(path === '/sign-out'){
            // making sure that the signout is always active
            setActive(true)
            return
        }
        setActive(location.pathname === path)
    },[location])

    return (
        <ListItem 
        //button this is where there  is the problem
        button
        component = {Link}
        to={path}
        className = { active ? "menuItemActive":"menuItem"}>
            {/* className = { clsx( "menuItem", active && "menuItemActive")}> */}
        
            <ListItemIcon>
                <Icon
                > 
                    <img 
                    src ={active ?iconActive:icon} 
                    className= "menuItemIcon"
                     alt = {label}/>
                </Icon>
            </ListItemIcon>
            <ListItemText 
                primary= {label}
                primaryTypographyProps={{variant:"body2"}}
            />


        </ListItem>
    )
}

export default MenuItem
