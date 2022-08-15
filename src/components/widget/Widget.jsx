import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { MonetizationOn } from "@mui/icons-material";
import { useSelector } from "react-redux";

const Widget = ({ type }) => {
  const user = useSelector((state) => state.user);

  let data;
  const diff = 0;
  switch (type) {
    case "user":
      let total1 = 0;
      for (let i = 0; i < user.userInfo.send_history.length; i++) {
        total1 += Number(user.userInfo.send_history[i].count);
      }
      data = {
        title: "送信したユーザ数",
        amount: total1,
        isMoney: false,
        link: "詳細を見る",
        icon: (
          <PersonIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "pink" }}
          />
        )
      };
      break;
    case "order":
      let total2 = 0;
      for (let i = 0; i < user.userInfo.check_history.length; i++) {
        total2 += Number(user.userInfo.check_history[i].count);
      }
      data = {
        title: "閲覧した回数（延べ回数）",
        amount: total2,
        isMoney: false,
        link: "詳細を見る",
        icon: <ShoppingCartIcon className="icon" />
      };
      break;
    case "earning":
      let total3 = user.userInfo.check_percentage;
      data = {
        title: "閲覧された割合",
        amount: total3 + "%",
        isMoney: false,
        link: "詳細を見る",
        icon: (
          <MonetizationOn
            className="icon"
            style={{ color: "crimson", backgroundColor: "gold" }}
          />
        )
      };
      break;
    default:
      break;
  }
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.amount}
          {data.isMoney && "円"}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon /> {diff}%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
