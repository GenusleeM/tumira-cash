import DashboardIcon from "../assets/DashboardIcon.svg";
import DashboardIconActive from "../assets/DashboardIconActive.svg";
import People from "../assets/People.svg";
import Person from "../assets/Person.svg";
import deposit from "../assets/bagcash.svg";
import purecash from "../assets/cashpure.svg";
import SettingsIcon from "../assets/SettingsIcon.svg";
import SettingsIconActive from "../assets/SettingsIconActive.svg";
import SignOutIcon from "../assets/SignOutIcon.svg";

// pages
import Dashboard from "../pages/Dashboard/DashBoard.js";
import Accounts from "../pages/Account/Accounts.js";
import Transactions from "../pages/Transactions/Transactions.js";

import Settings from "../pages/Settings/Settings.js";


const routes = [
  {
    label: "Dashboard",
    path: "/",
    icon: DashboardIcon,
    activeIcon: DashboardIconActive,
    component: Dashboard,
  },
  {
    label: "Clients",
    path: "/accounts",
    icon: People,
    activeIcon: Person,
    component: Accounts,
  },
  {
    label: "Cash Deposits",
    path: "/allcashdeposits",
    icon: deposit,
    activeIcon: purecash,
    component: Transactions,
  },
  
  {
    label: "Statistics",
    path: "/settings",
    icon: SettingsIcon,
    activeIcon: SettingsIconActive,
    component: Settings,
  },

  
  // {
  //   label: "User",
  //   path: "/user/:userid",
  //   icon: SignOutIcon,
  //   activeIcon: SignOutIcon,
  //   component:User
  // },
  // {
  //   label: "Sign Out",
  //   path: "/sign-out",
  //   icon: SignOutIcon,
  //   activeIcon: SignOutIcon,
  // },
  
];

export default routes;
