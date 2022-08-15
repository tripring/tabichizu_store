import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  TextField
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { updateToken } from "../../Redux/userSlice";
import "./notificationRegister.scss";
import CancelIcon from "@mui/icons-material/Cancel";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DatePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import DateFnsUtils from "@date-io/date-fns";
import { TimePicker } from "@mui/x-date-pickers";

const NotificationRegister = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // 表示する画像の配列
  const [images, setImages] = useState([]);
  // ユーザへ案内メッセージ
  const [message, setMessage] = useState("");

  // 乱数を生成する関数
  const inputId = Math.random().toString(32).substring(2);

  // タイトル
  const [title, setTitle] = useState("");
  // 概要
  const [overview, setOverview] = useState("");
  // 本文
  const [content, setContent] = useState("");
  // お知らせから誘導するWebページURL
  const [detailUrl, setDetailUrl] = useState("");

  // 開始日、時間
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date(2022, 0, 15, 10, 0));
  // 終了日、時間
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date(2022, 0, 15, 19, 0));
  //const submitNotification = async (e) => {
  const submitNotification = async (e) => {
    e.preventDefault();

    const params = new FormData();
    params.append("email", user.userInfo.email);
    params.append("token", user.userInfo.token);
    params.append("title", title);
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
  };

  const handleOnAddImage = (e) => {
    if (!e.target.files) return;
    setImages([...images, ...e.target.files]);
  };

  const handleOnRemoveImage = (index) => {
    // 選択した画像は削除可能
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  // 文字数の上限を超えていないか案内する
  const checkStringLength = (str, maxLength) => {
    return (
      <div
        style={{
          fontSize: "12px",
          color: "gray",
          textAlign: "right"
        }}
      >
        {str.length > maxLength ? (
          <span style={{ color: "red" }}>{str.length}</span>
        ) : (
          <span>{str.length}</span>
        )}
        /{maxLength}
      </div>
    );
  };

  return (
    <div className="notificationRegister">
      <Sidebar />
      <div className="notificationRegisterContainer">
        <Navbar />
        <div className="title">お知らせ登録</div>
        <div className="subtitle">今月あと1回、全国ユーザへ配信出来ます。</div>

        <div className="listContainer">
          <form action="" onSubmit={(e) => submitNotification(e)}>
            <div className="listTitle">画像アップロード</div>
            {/* 1つのボタンで画像を選択する */}
            <label htmlFor={inputId}>
              <Button
                variant="contained"
                disabled={images.length >= 8}
                component="span"
              >
                画像追加
              </Button>
              <input
                id={inputId}
                type="file"
                multiple
                accept="image/*,.png,.jpg,.jpeg"
                onChange={(e) => handleOnAddImage(e)}
                style={{ display: "none" }}
              />
            </label>
            <br />
            {/* 画像を選択したら選択中のすべての画像のプレビューを表示 */}
            {images.map((image, i) => (
              <div
                key={i}
                style={{
                  display: "inline-block",
                  position: "relative",
                  width: "200px",
                  height: "150px",
                  marginRight: "10px"
                }}
              >
                <IconButton
                  aria-label="delete image"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    color: "#aaa"
                  }}
                  onClick={() => handleOnRemoveImage(i)}
                >
                  <CancelIcon />
                </IconButton>
                <img
                  src={URL.createObjectURL(image)}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%"
                  }}
                />
              </div>
            ))}

            <br />
            <br />

            {/* 画像以外のフォーム */}
            <Grid container spacing={2.4}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="title"
                  name="title"
                  label="タイトル"
                  fullWidth
                  //autoComplete="given-name"
                  variant="standard"
                  onChange={(e) => setTitle(e.target.value)}
                />
                {checkStringLength(title, 20)}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="overview"
                  name="overview"
                  label="お知らせ概要"
                  fullWidth
                  //autoComplete="family-name"
                  variant="standard"
                  onChange={(e) => setOverview(e.target.value)}
                />
                {checkStringLength(overview, 40)}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="content"
                  name="content"
                  label="お知らせ内容"
                  fullWidth
                  multiline
                  rows={2}
                  //autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(e) => setContent(e.target.value)}
                />
                {checkStringLength(content, 80)}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="url"
                  name="url"
                  label="お知らせから誘導するWebページのURL（任意）"
                  fullWidth
                  autoComplete="shipping address-line2"
                  variant="standard"
                  onChange={(e) => setDetailUrl(e.target.value)}
                />
                {checkStringLength(detailUrl, 2083)}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="store_name"
                  name="store_name"
                  label="お知らせに表示される店名"
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="store_genre"
                  name="store_genre"
                  label="ジャンル"
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="store_access"
                  name="store_access"
                  label="アクセス情報"
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="google_map_url"
                  name="google_map_url"
                  label="GoogleMapのURL"
                  fullWidth
                  autoComplete="shipping country"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="配信開始日"
                    inputFormat="yyyy/MM/dd"
                    //value={value}
                    value={startDate}
                    onChange={(newValue) => {
                      setStartDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="配信開始時間"
                    value={startTime}
                    onChange={(newValue) => {
                      setStartTime(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="配信終了日"
                    inputFormat="yyyy/MM/dd"
                    //value={value}
                    value={endDate}
                    onChange={(newValue) => {
                      setEndDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="配信終了時間"
                    value={endTime}
                    onChange={(newValue) => {
                      setEndTime(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox color="primary" name="saveAddress" value="yes" />
                  }
                  label="プッシュ通知での配信を希望しますか"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      name="toAllOverJapan"
                      value="yes"
                    />
                  }
                  label="全国（海外含む）のユーザへの配信を希望しますか？（月に1度のみ可能)"
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              type="submit"
              disableElevation
              disabled={images.length < 1}
            >
              お知らせ登録
            </Button>
          </form>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default NotificationRegister;
