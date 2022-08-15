import "./chart.scss";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { useSelector } from "react-redux";

const Chart = () => {
  const { userInfo } = useSelector((state) => state.user);
  const sendHist = userInfo.send_history;
  const checkHist = userInfo.check_history;

  let history = [];
  let sendPos = 0;
  let checkPos = 0;

  for (let i = 0; i < 14; i++) {
    let date = new Date();
    date.setDate(date.getDate() - i); //指定した日分、前にする
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const full = year + "-" + month + "-" + day;

    let sendCount = 0;
    /*
    if (sendHist[sendPos].date && sendHist[sendPos].date === full) {
      sendCount = sendHist[sendPos].count;
      sendPos++;
    }
    */
    let checkCount = 0;
    if (checkHist[checkPos].date === full) {
      checkCount = checkHist[checkPos].count;
      checkPos++;
    }
    const hist = {
      sendCount: sendCount,
      checkCount: checkCount,
      date: full
    };
    //history.push(hist);
    history.unshift(hist);
  }

  return (
    <div className="chart">
      <div className="title" style={{ color: "gray" }}>
        直近14日間での発信・閲覧されたお知らせ
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={1000}
          height={500}
          data={history}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="1 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar name="発信した回数" dataKey="sendCount" fill="orange" />
          <Bar name="閲覧された回数" dataKey="checkCount" fill="lightgreen" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
