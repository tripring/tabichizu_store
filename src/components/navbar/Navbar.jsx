import React from "react";
import "./navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <div className="navbar">
      <div className="wrapper">
        {/*
        <div className="search">
          <input type="text" placeholder="検索" />
          <SearchIcon /
        */}
        <div className="items">
          {/*
          <div className="item">日本語</div>
          <div className="item">
            <NotificationsIcon className="icon" />
            {<div className="counter">2</div>}
          </div>
          */}
          <div className="item">
            <div className="account">
              ログイン中：{userInfo.corporate_info.corporate_name}(担当：
              {userInfo.corporate_info.rep_name}様)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
