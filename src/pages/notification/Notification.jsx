import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Table from "../../components/table/Table";
import { updateToken } from "../../Redux/userSlice";
import "./notification.scss";

// loadingとか入れたい
//https://qiita.com/baby-degu/items/e183b20dd20b20920e00

const Notification = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    try {
      const params = new URLSearchParams();
      params.append("email", user.userInfo.email);
      params.append("token", user.userInfo.token);

      const res = await axios.post(
        "https://tabichizu.com/api/v2/v2_corporate_notification",
        params
      );
      dispatch(updateToken(res.data));
      res.data.notifications && setNotifications(res.data.notifications);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="notification">
      <Sidebar />
      <div className="notificationContainer">
        <Navbar />
        <div className="title">お知らせ一覧</div>
        <div className="listContainer">
          <div className="listTitle">
            <Table notifications={notifications} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
