import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Notification from "./pages/notification/Notification";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from "./pages/account/Account";
import NotificationCreate from "./pages/notification-create/NotificationCreate";
import NotificationRegister from "./pages/notification-register/NotificationRegister";
import NewNotificationRegister from "./pages/new-notification-register/NewNotificationRegister";
import NotificationShow from "./pages/notification-show/NotificationShow";

export default function App() {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {!userInfo.email && <Route path="*" element={<Login />} />}
          {userInfo.email && (
            <Route
              path="/notification/new"
              element={<NewNotificationRegister />}
            />
          )}
          {userInfo.email && (
            <Route path="/notification/new2" element={<NotificationCreate />} />
          )}
          {userInfo.email && (
            <Route
              path="/notification/show/:id"
              element={<NotificationShow />}
            />
          )}
          {userInfo.email && <Route path="/account" element={<Account />} />}
          {userInfo.email && <Route path="*" element={<Notification />} />}
          {userInfo.email && <Route path="*" element={<Home />} />}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
