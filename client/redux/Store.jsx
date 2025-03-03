import { configureStore } from "@reduxjs/toolkit";
import emailReducer from "./EmailSlice";

 const store = configureStore({
  reducer: {
    email: emailReducer,
  },
});

export default store;
