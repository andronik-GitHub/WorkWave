import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";


export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params) => {
    const { data } = await axios.post('/auth/login', params);
    return data;
});

export const fetchMe = createAsyncThunk('auth/fetchMe', async () => {
    const { data } = await axios.get('/auth/me');
    return data;
});

export const fetchRegistration = createAsyncThunk('auth/fetchRegistration', async (params) => {
    const { data } = await axios.post('/auth/registration', params);
    return data;
});

export const fetchReset = createAsyncThunk('auth/fetchReset', async (params) => {
    const { data } = await axios.post('/auth/reset', params);
    return data;
});

export const fetchUpdate = createAsyncThunk('auth/fetchUpdate', async (params) => {
    const { data } = await axios.post('/users/update', params);
    return data;
});

const initialState = {
    data: null,
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRegistration.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchRegistration.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
            })
            .addCase(fetchRegistration.rejected, (state) => {
                state.status = 'error';
                state.data = null;
            })
            .addCase(fetchMe.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchMe.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
            })
            .addCase(fetchMe.rejected, (state) => {
                state.status = 'error';
                state.data = null;
            })
            .addCase(fetchLogin.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
            })
            .addCase(fetchLogin.rejected, (state) => {
                state.status = 'error';
                state.data = null;
            })
            .addCase(fetchReset.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchReset.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
            })
            .addCase(fetchReset.rejected, (state) => {
                state.status = 'error';
                state.data = null;
            })
            .addCase(fetchUpdate.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchUpdate.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
            })
            .addCase(fetchUpdate.rejected, (state) => {
                state.status = 'error';
                state.data = null;
            });
    },
});

export const selectIsAuth = state => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;