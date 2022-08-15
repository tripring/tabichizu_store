import "./table.scss";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const BasicTable = ({ notifications }) => {
  const isFinished = (endAt) => {
    const now = new Date();
    const end = new Date(endAt);
    return now > end;
  };

  const statusClassName = (approved_at, endAt) => {
    if (isFinished(endAt)) {
      return "Finished";
    }
    return approved_at ? "Approved" : "Pending";
  };

  const statusText = (approved_at, endAt) => {
    if (isFinished(endAt)) {
      return "配信期間終了";
    }
    return approved_at ? "配信中" : "許可待ち";
  };

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">トップ画像</TableCell>
            <TableCell className="tableCell">タイトル</TableCell>
            <TableCell className="tableCell">登録日時</TableCell>
            <TableCell className="tableCell">ステータス</TableCell>
            <TableCell className="tableCell">送信数</TableCell>
            <TableCell className="tableCell">閲覧数</TableCell>
            <TableCell className="tableCell">閲覧数（延べ)</TableCell>
            <TableCell className="tableCell">詳細</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notifications.map((row) => (
            <TableRow key={row.store_notification_id}>
              <TableCell
                className="tableCell"
                //style={{ marginTop: "0", marginBottom: "0", padding: "0" }}
              >
                <div className="cellWrapper">
                  <img src={row.image_url} alt="" className="image" />
                </div>
              </TableCell>
              <TableCell className="tableCell" style={{ fontWeight: "bold" }}>
                {row.title}
              </TableCell>
              <TableCell className="tableCell">{row.created_at}</TableCell>
              <TableCell className="tableCell">
                <span
                  className={`status ${statusClassName(
                    row.approved_at,
                    row.end_at
                  )}`}
                >
                  {statusText(row.approved_at, row.end_at)}
                </span>
              </TableCell>

              <TableCell className="tableCell">{row.sent_num}</TableCell>
              <TableCell className="tableCell">
                {row.checked_num} (
                {row.sent_num !== "0"
                  ? Math.floor(
                      (Number(row.checked_num) / Number(row.sent_num)) * 100.0
                    )
                  : 0}
                %)
              </TableCell>
              <TableCell className="tableCell">
                {row.total_checked_num}
              </TableCell>
              <TableCell className="tableCell">
                <Link
                  to={"/notification/show/" + row.store_notification_id}
                  style={{ textDecoration: "none" }}
                >
                  <span className="">詳細</span>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
