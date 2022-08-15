import { Button, Grid, Typography } from "@mui/material";
import { format } from "date-fns";

const NewNotificationRegisterReview = (props) => {
  const {
    images,
    title,
    overview,
    content,
    detailUrl,
    startDate,
    startTime,
    endDate,
    endTime,
    storeName,
    storeGenre,
    mapUrl,
    setActiveStep,
    submitNotification
  } = props;

  const startDatetime =
    format(startDate, "yyyy年MM月dd日") + format(startTime, "hh時mm分");
  const endDatetime =
    format(endDate, "yyyy年MM月dd日") + format(endTime, "hh時mm分");

  const typography = (header, content) => {
    return (
      <Grid item xs={6}>
        <Typography color="gray" gutterBottom>
          {header}
        </Typography>
        <Typography gutterBottom>{content}</Typography>
      </Grid>
    );
  };

  return (
    <>
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
      <Grid container spacing={2}>
        {typography("タイトル", title)}
        {typography("概要", overview)}
        {typography("本文", content)}
        {typography("お知らせに表示する店名", storeName)}
        {typography("お知らせのジャンル", storeGenre)}
        {typography("誘導するWebページのURL", detailUrl)}
        {typography("GoogleMapのURL", mapUrl)}
        {typography("配信開始日時", startDatetime)}
        {typography("配信終了日時", endDatetime)}
      </Grid>
      <Button
        variant="contained"
        onClick={(e) => submitNotification(e)}
        style={{ marginRight: "10px" }}
      >
        登録する
      </Button>
      <Button variant="outlined" onClick={(e) => setActiveStep(0)}>
        入力画面に戻る
      </Button>
    </>
  );
};

export default NewNotificationRegisterReview;
