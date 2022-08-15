import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./account.scss";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Account = () => {
  const { userInfo } = useSelector((state) => state.user);

  function createData(key, value) {
    return { key, value };
  }

  const rows = [
    createData("法人名", userInfo.corporate_info.corporate_name),
    createData("代表者名", userInfo.corporate_info.rep_name),
    createData("連絡先メールアドレス", userInfo.corporate_info.rep_email),
    createData("連絡先電話番号", userInfo.corporate_info.rep_phone),
    createData("ログインメールアドレス", userInfo.email),
    createData("ログインパスワード", "(セキュリティの為、非公開)")
  ];

  return (
    <div className="account">
      <Sidebar />
      <div className="accountContainer">
        <Navbar />

        <div className="listContainer">
          <div className="listTitle">アカウント登録情報</div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.key}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      style={{ color: "darkgray" }}
                      component="th"
                      scope="row"
                    >
                      {row.key}
                    </TableCell>
                    <TableCell align="left">{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Account;
