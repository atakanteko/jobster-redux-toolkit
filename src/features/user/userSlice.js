import customFetch from "../../utils/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {getUserFromLocalStorage, addUserToLocalStorage, removeUserFromLocalStorage} from "../../utils/localStorage";

// todo: refactor user slice

const initialState = {
    user: getUserFromLocalStorage(),
    isLoading: false,
    isSidebarOpen: false,
}

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (user, thunkAPI) => {
        try {
            const resp = await customFetch.post('/auth/register', user);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (user, thunkAPI) => {
        try {
            const resp = await customFetch.post('/auth/login', user);
            return resp.data;
        } catch (error){
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (user, thunkAPI) => {
        try {
            const resp = await customFetch.patch('/auth/updateUser', user, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
                },
            });
            return resp.data;
        } catch (error) {
            // console.log(error.response);
            if (error.response.status === 401) {
                thunkAPI.dispatch(logoutUser());
                return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
            }
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        logoutUser: (state, action) => {
            state.user = null;
            state.isSidebarOpen = false;
            removeUserFromLocalStorage();
            if(action.payload){
                toast.success(action.payload)
            }
        },
    },
    extraReducers: {
        [registerUser.pending]: (state) => {
            state.isLoading = true;
        },
        [registerUser.fulfilled]: (state, action) => {
            const { user } = action.payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success(`Hello There ${user.name}`);
        },
        [registerUser.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
        },
        [loginUser.pending]: (state) => {
            state.isLoading = true;
        },
        [loginUser.fulfilled]: (state, { payload }) => {
            const { user } = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success(`Welcome Back ${user.name}`);
        },
        [loginUser.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
        },
        [updateUser.pending]: (state) => {
            state.isLoading = true;
        },
        [updateUser.fulfilled]: (state, { payload }) => {
            const { user } = payload;
            state.isLoading = false;
            state.user = user;

            addUserToLocalStorage(user);
            toast.success('User Updated');
        },
        [updateUser.pending]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
        },
    }
});

export default userSlice.reducer;
export const { toggleSidebar, logoutUser } = userSlice.actions;
