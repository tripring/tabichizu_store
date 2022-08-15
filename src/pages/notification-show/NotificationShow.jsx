import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import NotificationShowContent from "./NotificationShowContent";
import "./notificationShow.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { updateToken } from "../../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

const NotificationShow = (props) => {
  const id = useParams().id;

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [notification, setNotification] = useState();

  useEffect(() => {
    getNotification();
  }, []);

  const getNotification = async () => {
    try {
      const params = new URLSearchParams();
      params.append("email", user.userInfo.email);
      params.append("token", user.userInfo.token);
      params.append("store_notification_id", id);

      const res = await axios.post(
        "https://tabichizu.com/api/v2/v2_corporate_notification_detail",
        params
      );
      dispatch(updateToken(res.data));
      res.data.notification && setNotification(res.data.notification);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="notificationShow">
      <Sidebar />
      <div className="notificationShowContainer">
        <Navbar />
        <div className="title">お知らせ詳細</div>
        <div className="listContainer">
          <NotificationShowContent notification={notification} />
        </div>
      </div>
    </div>
  );
};

export default NotificationShow;
