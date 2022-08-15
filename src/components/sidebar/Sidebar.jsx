import React from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/userSlice";

import SendIcon from "@mui/icons-material/Send";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">たびちず for ストア</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">メインメニュー</p>
          <Link to="/notification" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleIcon className="icon" />
              <span>お知らせ一覧</span>
            </li>
          </Link>
          <Link to="/notification/new" style={{ textDecoration: "none" }}>
            <li>
              <SendIcon className="icon" />
              <span>お知らせを登録する</span>
            </li>
          </Link>

          <Link to="/account" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleIcon className="icon" />
              <span>アカウント情報</span>
            </li>
          </Link>
          <Link to="/logout" style={{ textDecoration: "none" }}>
            <li onClick={handleLogout}>
              <LogoutIcon className="icon" />
              <span>ログアウト</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
      </div>
    </div>
  );
};

export default Sidebar;
