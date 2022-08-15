import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const passwordLogin = createAsyncThunk(
  "users/passwordLogin",
  async (user) => {
    const params = new URLSearchParams();
    params.append("email", user.email);
    params.append("password", user.password);
    const res = await axios.post(
      //"https://tabichizu.com/api/api_corp_account_info",
      "https://tabichizu.com/api/v2/v2_corporate_account_info",
      params
    );
    console.log(res.data);
    return res.data;
  }
);

const USERINFO_INITIAL_STATE = {
  seq: "",
  email: "",
  token: "",
  corp_account_info: {
    rep_name: "",
    rep_email: "",
    rep_phone_number: "",
    corp_name: "",
    corp_address: "",
    corp_url: "",
    store_name: "",
    store_prefecture_seq: "",
    store_city_code: "",
    store_latitude: "",
    store_longitude: "",
    store_type: "",
    created_datetime: ""
  },
  send_history: [{ count: "", date: "" }],
  check_history: [{ count: "", date: "" }],
  percentage: ""
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: USERINFO_INITIAL_STATE,
    pending: false,
    error: false,
    errorMessage: ""
  },
  reducers: {
    updateToken: (state, action) => {
      if (action.payload.token) {
        state.userInfo.token = action.payload.token;
      } else {
        state.userInfo = USERINFO_INITIAL_STATE;
      }
    },
    logout: (state) => {
      state.userInfo = USERINFO_INITIAL_STATE;
      state.pending = false;
      state.error = false;
      state.errorMessage = "";
    }
  },
  extraReducers: {
    [passwordLogin.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [passwordLogin.fulfilled]: (state, action) => {
      state.pending = false;
      console.log(action.payload);
      //if (action.payload.flag === "1") {
      if (action.payload.token) {
        state.userInfo = action.payload;
        state.errorMessage = "";
      } else {
        state.userInfo = USERINFO_INITIAL_STATE;
        state.errorMessage = action.payload.message;
      }
    },
    [passwordLogin.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    }
  }
});

// 通常の Reducer のみ export する。（ ExtraReducer は export しなくて良さそう）
export const { updateToken, logout } = userSlice.actions;
//export const { updateStart, updateSuccess, updateError } = userSlice.actions;
export default userSlice.reducer;
