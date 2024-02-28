import { configureStore } from "@reduxjs/toolkit";
import { jobReducer } from "./slices/job.slice";

const Store = configureStore({
  reducer: {
    jobs: jobReducer,
  },
});

export default Store;
