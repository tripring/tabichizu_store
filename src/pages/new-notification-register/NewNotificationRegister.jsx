import { Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { updateToken } from "../../Redux/userSlice";
import "./newNotificationRegister.scss";
import NewNotificationRegisterInput from "./NewNotificationRegisterInput";
import NewNotificationRegisterReview from "./NewNotificationRegisterReview";
import { format } from "date-fns";

import ReactLoading from "react-loading";

const NewNotificationRegister = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = useState(0);

  // 表示する画像の配列
  const [images, setImages] = useState([]);
  // ユーザへ案内メッセージ
  const [message, setMessage] = useState("");

  // タイトル
  const [title, setTitle] = useState("");
  // 概要
  const [overview, setOverview] = useState("");
  // 本文
  const [content, setContent] = useState("");
  // お知らせから誘導するWebページURL
  const [detailUrl, setDetailUrl] = useState("");
  // 店名
  const [storeName, setStoreName] = useState("");
  // ジャンル
  const [storeGenre, setStoreGenre] = useState("");
  // アクセス情報
  const [storeAccess, setStoreAccess] = useState("");
  //GoogleMapURL
  const [mapUrl, setMapUrl] = useState("");

  // 開始日、時間
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date(2022, 0, 15, 10, 0));
  // 終了日、時間
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date(2022, 0, 15, 19, 0));

  // 緯度
  const [latitude, setLatitude] = useState(0.0);
  // 経度
  const [longitude, setLongitude] = useState(0.0);

  const [toAllOverJapan, setToAllOverJapan] = useState(false);

  const startDatetime =
    format(startDate, "yyyy-MM-dd") + " " + format(startTime, "hh:mm:ss");
  const endDatetime =
    format(endDate, "yyyy-MM-dd") + " " + format(endTime, "hh:mm:ss");

  console.log(toAllOverJapan);

  //const submitNotification = async (e) => {
  const submitNotification = async (e) => {
    e.preventDefault();
    setActiveStep(2);

    const params = new FormData();
    params.append("email", user.userInfo.email);
    params.append("token", user.userInfo.token);
    params.append("title", title);
    params.append("overview", overview);
    params.append("content", content);
    params.append("url", detailUrl);
    params.append("google_map_url", detailUrl);
    params.append("store_name", storeName);
    params.append("store_genre", storeGenre);
    params.append("store_access", storeAccess);
    params.append("start_at", startDatetime);
    params.append("end_at", endDatetime);
    params.append("latitude", latitude);
    params.append("longitude", longitude);

    for (let i = 0; i < images.length; i++) {
      params.append("image_" + i, images[i]);
    }

    try {
      const res = await axios.post(
        //"https://tabichizu.com/api/api_corp_create_store_notification_images",
        "https://tabichizu.com/api/v2/v2_corporate_notification_create",
        params,
        {
          headers: {
            "content-type": "multipart/form-data"
          }
        }
      );
      console.log(JSON.stringify(res?.data));
      dispatch(updateToken(res.data));

      if (res.data && res.data.flag && res.data.flag === "1") {
        setImages([]);
        setMessage("登録完了しました");
      } else {
        setMessage(
          "正しく登録出来ませんでした。時間を空けてやり直して下さい。"
        );
      }
    } catch (err) {
      console.log(err);
    }
    setActiveStep(3);
  };

  const stepComponent = () => {
    if (activeStep === 0) {
      return (
        <NewNotificationRegisterInput
          images={images}
          setImages={setImages}
          title={title}
          setTitle={setTitle}
          overview={overview}
          setOverview={setOverview}
          content={content}
          setContent={setContent}
          detailUrl={detailUrl}
          setDetailUrl={setDetailUrl}
          startDate={startDate}
          setStartDate={setStartDate}
          startTime={startTime}
          setStartTime={setStartTime}
          endDate={endDate}
          setEndDate={setEndDate}
          endTime={endTime}
          setEndTime={setEndTime}
          storeName={storeName}
          setStoreName={setStoreName}
          storeGenre={storeGenre}
          setStoreGenre={setStoreGenre}
          mapUrl={mapUrl}
          setMapUrl={setMapUrl}
          setActiveStep={setActiveStep}
          storeAccess={storeAccess}
          setStoreAccess={setStoreAccess}
          latitude={latitude}
          setLatitude={setLatitude}
          longitude={longitude}
          setLongitude={setLongitude}
          toAllOverJapan={toAllOverJapan}
          setToAllOverJapan={setToAllOverJapan}
        />
      );
    } else if (activeStep === 1) {
      return (
        <NewNotificationRegisterReview
          images={images}
          title={title}
          overview={overview}
          setOverview={setOverview}
          content={content}
          setContent={setContent}
          detailUrl={detailUrl}
          setDetailUrl={setDetailUrl}
          startDate={startDate}
          setStartDate={setStartDate}
          startTime={startTime}
          setStartTime={setStartTime}
          endDate={endDate}
          setEndDate={setEndDate}
          endTime={endTime}
          setEndTime={setEndTime}
          storeName={storeName}
          setStoreName={setStoreName}
          storeGenre={storeGenre}
          setStoreGenre={setStoreGenre}
          mapUrl={mapUrl}
          setMapUrl={setMapUrl}
          setActiveStep={setActiveStep}
          submitNotification={submitNotification}
          storeAccess={storeAccess}
          setStoreAccess={setStoreAccess}
          latitude={latitude}
          setLatitude={setLatitude}
          longitude={longitude}
          setLongitude={setLongitude}
        />
      );
    } else if (activeStep === 2) {
      return (
        <>
          <p>お知らせ登録処理をしています。数秒お待ち下さい。</p>
          <ReactLoading
            type="spin"
            color="#ebc634"
            height="100px"
            width="100px"
            className="mx-auto"
          />
        </>
      );
    } else if (activeStep === 3) {
      return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography gutterBottom>
              お知らせの登録が完了しました。
              <br />
              通常、数分後からユーザへの配信が開始されます。
              <br />
              お知らせ一覧から登録済みのお知らせを編集出来ます。
            </Typography>
          </Grid>
        </Grid>
      );
    }
  };

  return (
    <div className="notificationRegister">
      <Sidebar />
      <div className="notificationRegisterContainer">
        <Navbar />
        <div className="title">お知らせ登録</div>
        <div className="subtitle">今月あと1回、全国ユーザへ配信出来ます。</div>
        <div className="listContainer">{stepComponent()}</div>
      </div>
    </div>
  );
};

export default NewNotificationRegister;
