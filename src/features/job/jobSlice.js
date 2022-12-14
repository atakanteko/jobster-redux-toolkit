import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import {logoutUser} from "../user/userSlice";
import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice';

const initialState = {
    isLoading: false,
    position: '',
    company: '',
    jobLocation: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    isEditing: false,
    editJobId: '',
};

export const createJob = createAsyncThunk(
    'job/createJob',
    async (job, thunkAPI) => {
        try {
            const resp = customFetch.post('/jobs', job, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
                },
            });
            thunkAPI.dispatch(clearValues());
            return resp.data;
        } catch (error) {
            // basic setup
            return thunkAPI.rejectWithValue(error.response.data.msg);
            // logout user
            thunkAPI.dispatch(logoutUser());
            if (error.response.status === 401) {
                    return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
                }
                return thunkAPI.rejectWithValue(error.response.data.msg);
            }
        }
)

export const deleteJob = createAsyncThunk(
    'job/delete',
    async (jobId, thunkAPI) => {
        thunkAPI.dispatch(showLoading());
        try {
            const resp = await customFetch.delete(`/jobs/${jobId}`, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
                },
            });
            thunkAPI.dispatch(getAllJobs());
            return resp.data;
        } catch (error) {
            thunkAPI.dispatch(hideLoading());
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)

const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        handleChange: (state, action) => {
            const { name, value } = action.payload;
            state[name] = value;
        },
        clearValues: () => {
            return {
                ...initialState,
                jobLocation: getUserFromLocalStorage()?.location || '',
            };
        }
    },
    extraReducers: {
        [createJob.pending]: (state) => {
            state.isLoading = true;
        },
        [createJob.fulfilled]: (state, action) => {
            state.isLoading = false;
            toast.success('Job Created');
        },
        [createJob.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
        },
    }
})

export default jobSlice.reducer;
export const { handleChange, clearValues } = jobSlice.actions;