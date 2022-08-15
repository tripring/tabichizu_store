import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { updateToken } from "../../Redux/userSlice";
import "./notificationCreate.scss";

const NotificationCreate = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // 表示する画像の配列
  const [images, setImages] = useState([]);
  // サーバに送信する画像の配列
  const [paramImages, setParamImages] = useState([]);
  // ユーザへ案内メッセージ
  const [message, setMessage] = useState("");

  const [jaTitle, setJaTitle] = useState("");
  const [enTitle, setEnTitle] = useState("");
  const [chTitle, setChTitle] = useState("");

  //const submitNotification = async (e) => {
  const submitNotification = async () => {
    if (paramImages.length < 1) {
      setMessage("画像が選択されていません");
      return;
    }
    const params = new FormData();
    params.append("email", user.userInfo.email);
    params.append("token", user.userInfo.token);
    // params.append( "image", 画像のリスト ) のような形ではダメ
    // 画像ファイルは１つの変数につき、１つのファイルを与えないと、PHPで正しく受信出来ない
    for (let i = 0; i < paramImages.length; i++) {
      params.append("image_" + i, paramImages[i]);
    }

    try {
      const res = await axios.post(
        "https://tabichizu.com/api/api_corp_create_store_notification_images",
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
        setParamImages([]);
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

  const addImages = (e) => {
    setMessage("");
    for (let i = 0; i < e.target.files.length; i++) {
      if (images.length >= 8) {
        setMessage("画像は8枚まで登録出来ます");
        return;
      }
      // ここで画像ファイルかどうかのチェックをする
      let file_type = e.target.files[i].name.split(".").pop();
      if (!["png", "jpg", "jpeg", "PNG", "JPG", "JPEG"].includes(file_type)) {
        setMessage("png,jpg,jpeg以外のファイルは選択出来ません。");
        return;
      }
      let tmpImage = e.target.files[i];
      let tmpImageUrl = window.URL.createObjectURL(tmpImage);
      setImages([...images, tmpImageUrl]);
      setParamImages([...paramImages, tmpImage]);
    }
  };

  const translateTitle = (e) => {
    setJaTitle(e.target.value);
    if (e.target.value === "") {
      setChTitle("");
      setEnTitle("");
      return;
    }
    translate(e.target.value, "ja", "en");
    translate(e.target.value, "ja", "zh-cn");
  };

  const translate = async (text, source, target) => {
    let params = "text=" + text + "&source=" + source + "&target=" + target;
    try {
      const res = await axios.get(
        "https://script.google.com/macros/s/AKfycbxhG2J1euxw25WZMXYtQFCCt9Kq5yITR3OaBNhhH2cwLWR6_3Hisx31X4Yc9vueTxrp/exec?" +
          params
      );
      console.log(JSON.stringify(res?.data));
      if (target === "en") {
        setEnTitle(res.data.text);
      } else {
        setChTitle(res.data.text);
      }
      return res.data.text;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="notificationCreate">
      <Sidebar />
      <div className="notificationCreateContainer">
        <Navbar />
        <div className="title">お知らせ登録</div>
        <div className="listContainer">
          <div className="listTitle">画像アップロード</div>
          <form>
            <input multiple type="file" onChange={addImages} />
            <div className="images">
              <div style={{ width: "160px", height: "120px" }}>
                <image
                  src={images[0]}
                  alt="image"
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%"
                  }}
                />
              </div>
              {/*
              {images.map((row) => (
                <div style={{ width: "160px", height: "120px" }}>
                  <image
                    src={row}
                    alt="image"
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%"
                    }}
                  />
                </div>
              ))}
                  */}
            </div>
            <textarea
              placeholder="タイトル"
              value={jaTitle}
              onChange={translateTitle}
            />
            <textarea placeholder="Title" value={enTitle} />
            <textarea placeholder="Title（China)" value={chTitle} />
            <button type="button" onClick={submitNotification}>
              送信
            </button>
            <p style={{ color: "red" }}>{message}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NotificationCreate;
