import customFetch from "../../utils/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    user: null,
    isLoading: false,
}

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (user, thunkAPI) => {
        console.log(`Register user: ${ user }`)
    }
);

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (user, thunkAPI) => {
        console.log(`Login User : ${user}`)
        }
);

const userSlice = createSlice({
    name: "user",
    initialState,
});

export default userSlice.reducer;