import "./App.css";
import React, { useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import routes from "./routes/Routes";
import TopBar from "./components/Navigation/TopBar/TopBar";
import NewUser from "./components/User/NewUser/NewUser";
import Order from "./components/Order/Order";
import NewOrder from "./components/NewOrder/NewOrder";
import User from "./components/User/User";

import SignIn from "./components/Login/Login";
import NewCashDeposit from "./components/CashFacility/Deposits/Deposits/NewCashDeposit/NewCashDeposit";
import AllCashDeposits from "./components/CashFacility/Deposits/Deposits/AllCashDeposits";
import EditCashDeposit from "./components/CashFacility/Deposits/Deposits/EditCashDeposit/EditCashDepost";
import CashFee from "./components/CashFacility/Setfee/CashFee";

import CashReport from "./components/CashFacility/CashReports/CashReport";
import UpdateCashDeposits from "./components/CashFacility/Orders/UpdateCashOrders/UpdateCashOrders";
import UpdateCashOrders from "./components/CashFacility/Orders/UpdateCashOrders/UpdateCashOrders";

const App = () => {
  const [login, setLogin] = useState(false);

  return (
    <>
      {login ? (
        <div className="appRoot">
          <Router>
            <TopBar />
            {/* <TopTab/> */}
            <Navigation />
            <div>
              {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
              <Switch>
                {/* component based routes */}
                <Route path="/newUser">
                  <NewUser />
                </Route>
                <Route path="/order/:orderid">
                  <Order />
                </Route>

                <Route path="/cashOrder/:orderid">
                  <UpdateCashOrders />
                </Route>
                <Route path="/newOrder">
                  <NewOrder />
                </Route>

                <Route path="/user/:userid">
                  <User />
                </Route>

                <Route path="/newcashdeposits">
                  <NewCashDeposit />
                </Route>

                <Route path="/allcashdeposits">
                  <AllCashDeposits />
                </Route>

                <Route path="/updateCashDeposits/:id">
                  <EditCashDeposit />
                </Route>

                <Route path="/setfee">
                  <CashFee />
                </Route>

                <Route path="/cashStatement/:userid">
                  <CashReport />
                </Route>

                {routes.map((route, index) => {
                  return (
                    <Route exact key={index} path={route.path}>
                      {route.component}
                    </Route>
                  );
                })}
              </Switch>
            </div>
          </Router>
        </div>
      ) : (
        <SignIn setLogin={setLogin} />
      )}
    </>
  );
};

export default App;
