import React from "react";
import "./FeatureInfor.css";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const FeatureInfor = () => {
  return (
    <div className="featured">
      <div className="featureItem">
        <span className="featuredTitle">Coming Soon</span>
        <div className="featureContainer">
          <span className="total">0.00</span>
          <span className="Rate">
            <PeopleAltIcon className="featureIcon featureIcon-positive" />
          </span>
        </div>
      </div>
      <div className="featureItem">
        <span className="featuredTitle">Coming Soon </span>
        <div className="featureContainer">
          <span className="total">0.00</span>
          <span className="Rate">
            <cash className="featureIcon featureIcon-positive" />
          </span>
        </div>
      </div>
      <div className="featureItem">
        <span className="featuredTitle">Coming Soon</span>
        <div className="featureContainer">
          <span className="total">0.00</span>
          <span className="Rate">
            <PeopleAltIcon className="featureIcon featureIcon-positive" />
          </span>
        </div>
      </div>
      
    </div>
  );
};

export default FeatureInfor;
