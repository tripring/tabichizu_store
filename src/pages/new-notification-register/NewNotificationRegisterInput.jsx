import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  TextField
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const NewNotificationRegisterInput = (props) => {
  const {
    images,
    setImages,
    title,
    setTitle,
    overview,
    setOverview,
    content,
    setContent,
    detailUrl,
    setDetailUrl,
    startDate,
    setStartDate,
    startTime,
    setStartTime,
    endDate,
    setEndDate,
    endTime,
    setEndTime,
    storeName,
    setStoreName,
    storeGenre,
    setStoreGenre,
    mapUrl,
    setMapUrl,
    setActiveStep,
    storeAccess,
    setStoreAccess,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    toAllOverJapan,
    setToAllOverJapan
  } = props;

  // 乱数を生成する関数
  const inputId = Math.random().toString(32).substring(2);

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

  const [enTitle, setEnTitle] = useState("");
  const [koTitle, setKoTitle] = useState("");
  const [cnTitle, setCnTitle] = useState("");

  const translate = async (text, setText, source, target) => {
    let params = "text=" + text + "&source=" + source + "&target=" + target;
    try {
      const res = await axios.get(
        "https://script.google.com/macros/s/AKfycbxhG2J1euxw25WZMXYtQFCCt9Kq5yITR3OaBNhhH2cwLWR6_3Hisx31X4Yc9vueTxrp/exec?" +
          params
      );
      //console.log(JSON.stringify(res?.data));
      if (JSON.stringify(res?.data.text) !== '"Bad Request"') {
        setText(JSON.stringify(res?.data.text));
      } else {
        setText("");
      }
      //return res.data.text;
    } catch (err) {
      console.log(err);
    }
  };

  const changeTitle = (e) => {
    setTitle(e.target.value);
    translate(e.target.value, setEnTitle, "ja", "en");
    translate(e.target.value, setKoTitle, "ja", "ko");
    translate(e.target.value, setCnTitle, "ja", "zh-cn");
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
    <form action="" onSubmit={(e) => setActiveStep(1)}>
      <div className="listTitle">
        画像アップロード {images.length}枚選択中(最大8枚)
        ＊1枚当たり5MBが上限です。
      </div>
      {/* 1つのボタンで画像を選択する */}
      <label htmlFor={inputId}>
        <Button
          variant="contained"
          disabled={images.length >= 8}
          component="span"
        >
          画像を追加する
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
            alt="お知らせに登録する画像"
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
            value={title}
            fullWidth
            //inputProps={{ readOnly: true }}
            //autoComplete="given-name"
            variant="standard"
            onChange={(e) => changeTitle(e)}
          />
          {checkStringLength(title, 20)}
          <p style={{ fontSize: "14px" }}>英語：{enTitle}</p>
          <p style={{ fontSize: "14px" }}>韓国語：{koTitle}</p>
          <p style={{ fontSize: "14px" }}>中国語：{cnTitle}</p>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="overview"
            name="overview"
            label="お知らせ概要"
            value={overview}
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
            value={content}
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
            value={detailUrl}
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
            value={storeName}
            fullWidth
            variant="standard"
            onChange={(e) => setStoreName(e.target.value)}
          />
          {checkStringLength(storeName, 20)}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="store_genre"
            name="store_genre"
            label="ジャンル"
            value={storeGenre}
            fullWidth
            variant="standard"
            onChange={(e) => setStoreGenre(e.target.value)}
          />
          {checkStringLength(storeGenre, 8)}
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="google_map_url"
            name="google_map_url"
            label="GoogleMapのURL"
            value={mapUrl}
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            onChange={(e) => setMapUrl(e.target.value)}
          />
          {checkStringLength(mapUrl, 2083)}
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="配信開始日"
              inputFormat="yyyy/M/d"
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
              inputFormat="yyyy/M/d"
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
        <Grid item xs={12}>
          <TextField
            required
            id="store_access"
            name="store_access"
            label="お店のアクセス情報"
            value={storeAccess}
            fullWidth
            variant="standard"
            onChange={(e) => setStoreAccess(e.target.value)}
          />
          {checkStringLength(storeAccess, 20)}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="latitude"
            name="latitude"
            label="店舗の所在地 緯度"
            value={latitude}
            fullWidth
            variant="standard"
            onChange={(e) => setLatitude(e.target.value)}
          />
          {checkStringLength(latitude, 20)}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="longitude"
            name="longitude"
            label="店舗の所在地 経度"
            value={longitude}
            fullWidth
            variant="standard"
            onChange={(e) => setLongitude(e.target.value)}
          />
          {checkStringLength(latitude, 20)}
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
                onChange={(e) => setToAllOverJapan(e.target.checked)}
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
        確認画面に進む
      </Button>
    </form>
  );
};

export default NewNotificationRegisterInput;
