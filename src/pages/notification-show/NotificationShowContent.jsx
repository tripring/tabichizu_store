import { Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import React from "react";
import { format } from "date-fns";

const NotificationShowContent = ({ notification }) => {
  // 乱数を生成する関数
  const inputId = Math.random().toString(32).substring(2);

  // 仮データ
  const data = {
    images: [],
    title: "タイトル",
    overview: "オーバービュー",
    content: "コンテント",
    detailUrl: "https://tabichizu.com",
    storeName: "店名",
    storeGenre: "ジャンル",
    mapUrl: "https://tabichizu.com",
    startDate: "2000年5月7日",
    endDate: "2100年5月7日",
    shouldPush: false,
    toAllOverJapan: true
  };

  if (notification) {
    data.images = notification.image_urls;
    data.title = notification.title;
    data.overview = notification.overview;
    data.content = notification.content;
    data.detailUrl = notification.url;
    data.storeName = notification.store_name;
    data.storeGenre = notification.store_genre;
    data.mapUrl = notification.google_map_url;
    const startAt = new Date(notification.start_at);
    data.startDate = format(startAt, "yyyy年MM月dd日 hh時mm分から");
    const endAt = new Date(notification.end_at);
    data.endDate = format(endAt, "yyyy年MM月dd日 hh時mm分まで");
  }

  return (
    <form action="">
      {/* 画像を選択したら選択中のすべての画像のプレビューを表示 */}
      {data.images.map((image, i) => (
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
          <img
            src={image}
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
            value={data.title}
            fullWidth
            inputProps={{ readOnly: true }}
            //autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="overview"
            name="overview"
            label="お知らせ概要"
            value={data.overview}
            fullWidth
            inputProps={{ readOnly: true }}
            //autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="content"
            name="content"
            label="お知らせ内容"
            value={data.content}
            fullWidth
            multiline
            inputProps={{ readOnly: true }}
            rows={2}
            //autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="url"
            name="url"
            label="お知らせから誘導するWebページのURL（任意）"
            value={data.detailUrl}
            fullWidth
            inputProps={{ readOnly: true }}
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="store_name"
            name="store_name"
            label="お知らせに表示される店名"
            value={data.storeName}
            inputProps={{ readOnly: true }}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="store_genre"
            name="store_genre"
            label="ジャンル"
            value={data.storeGenre}
            inputProps={{ readOnly: true }}
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
            value={data.mapUrl}
            inputProps={{ readOnly: true }}
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="start_date"
            name="start_date"
            label="配信開始日時"
            value={data.startDate}
            fullWidth
            inputProps={{ readOnly: true }}
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="end_date"
            name="end_date"
            label="配信終了日時"
            value={data.endDate}
            fullWidth
            inputProps={{ readOnly: true }}
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                name="should_push"
                inputProps={{ readOnly: true }}
                checked={data.shouldPush}
                disabled
              />
            }
            label="プッシュ通知での配信を希望しますか"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                name="to_all_over_japan"
                inputProps={{ readOnly: true }}
                checked={data.toAllOverJapan}
                disabled
              />
            }
            label="全国（海外含む）のユーザへの配信を希望しますか？（月に1度のみ可能)"
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default NotificationShowContent;
