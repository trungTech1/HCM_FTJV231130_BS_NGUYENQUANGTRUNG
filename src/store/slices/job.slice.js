import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getJobs = createAsyncThunk("job/getJobs", async () => {
  try {
    const response = await axios.get("http://localhost:3000/jobs");
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error", error);
  }
});

const jobSlice = createSlice({
  name: "job",
  initialState: {
    jobs: [],
  },
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
    addJob: (state, action) => {
      state.jobs.push(action.payload);
    },
    updateJobStatus: (state, action) => {
      const job = state.jobs.find((job) => job.id === action.payload);
      if (job) {
        job.status = job.status === "completed" ? "incompleted" : "completed";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getJobs.fulfilled, (state, action) => {
      state.jobs = action.payload;
    });
  },
});

export const jobActions = { ...jobSlice.actions, getJobs };
export const jobReducer = jobSlice.reducer;
