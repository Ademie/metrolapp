import { configureStore } from "@reduxjs/toolkit";
import  navReducer  from "./navSlice";
import splashReducer from "./splashSlice"
import userReducer from './userSlice'


const store = configureStore({
  reducer: {
    nav: navReducer,
    splashed: splashReducer,
    userInfo: userReducer,
  },
});

export default store;
