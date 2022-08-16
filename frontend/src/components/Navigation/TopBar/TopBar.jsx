import React, { useState } from "react";
import "./Topbar.css";
import { Link } from "react-router-dom";
import tumira from "../../../images/tumira.png";
import fansetLogo from "../../../images/fansetLogo.png";
import { useHistory } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

import {
  Avatar,
  IconButton,
  Button,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import { fontSize } from "@mui/system";

const TopBar = () => {
  const history = useHistory();
  const [active, setActivePage] = useState(false);
  const changeActivePage = (e) => {
    let id = e.target.id;
    setActivePage(id);
  };

  const logout = () => {
    // localStorage.clear();
    history.push("");
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <div className="logoimg">
            <span>{<img className="img" src={tumira} />} </span>
          </div>

          <div className="logotext">
            <span className="logo">Tumira Cash International</span>
          </div>
        </div>
        <div className="topCenterFlex">
          <div className={active === "main" ? "topCenterActive" : undefined}>
            <Tooltip title="Dashbord with Statistics" arrow>
              <Button
                style={{
                  borderColor: "blue",
                  color: "white",
                  textTransform: "none",
                  fontSize: "18px",
                }}
                component={Link}
                id="main"
                to="/"
                onClick={changeActivePage}
                variant="text"
              >
                Dashboard
              </Button>
            </Tooltip>
          </div>
          {/* <div className={active === "accounts" ? "topCenterActive" : undefined}>

            <Button style={{

              borderColor: "blue",
              color: "white",
              textTransform: "none",
              fontSize: "18px"

            }} component={Link}
              id="accounts"
              to="/accounts"
              onClick={changeActivePage} variant="text">Clients</Button>

          </div> */}
          <div
            className={active === "accounts" ? "topCenterActive" : undefined}
          >
            <Tooltip title="All Registered Clients" arrow>
              <Button
                style={{
                  borderColor: "blue",
                  color: "white",
                  textTransform: "none",
                  fontSize: "18px",
                }}
                component={Link}
                id="accounts"
                to="/accounts"
                onClick={changeActivePage}
                variant="text"
              >
                Clients
              </Button>
            </Tooltip>
          </div>
          <div
            className={active === "deposits" ? "topCenterActive" : undefined}
          >
            <Tooltip title="All Cash Deposits" arrow>
              <Button
                style={{
                  borderColor: "blue",
                  color: "white",
                  textTransform: "none",
                  fontSize: "18px",
                }}
                component={Link}
                id="deposits"
                to="/allcashdeposits"
                onClick={changeActivePage}
                variant="text"
              >
                Deposits
              </Button>
            </Tooltip>
          </div>
          <div
            className={active === "statistics" ? "topCenterActive" : undefined}
          >
            <Tooltip title="Graphs and Chats" arrow>
              <Button
                style={{
                  borderColor: "blue",
                  color: "white",
                  textTransform: "none",
                  fontSize: "18px",
                }}
                component={Link}
                id="statistics"
                to="/settings"
                onClick={changeActivePage}
                variant="text"
              >
                Statistics
              </Button>
            </Tooltip>
          </div>
        </div>

        <div className="topRight">
          <div className="topbarIcons">
            <div className="logoimg">
              <span>{<img className="imgFanset" src={fansetLogo} />} </span>
            </div>
            <form onSubmit={logout}>
              <div className="logout">
                <button className="log_out" type="submit" onClick={logout}>
                  Logout
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
