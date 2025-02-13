import {
    createAsyncThunk,
    createSlice,
    SerializedError,
} from '@reduxjs/toolkit';
import axios from 'axios';

import { seminarType } from '@/shared/libs/types';

//  A function to get all seminars from server data
export const getSeminars = createAsyncThunk(
    'seminars/getSeminars',
    async (__, thunkApi) => {
        try {
            const response = await axios.get('http://localhost:3000/seminars');
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
);

//  A function to delete seminar by id from server data
export const deleteSeminarById = createAsyncThunk(
    'seminars/deleteSeminarsById',
    async (id: number, thunkApi) => {
        try {
            await axios.delete(`http://localhost:3000/seminars/${id}`);
            return id;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
);

export const editSeminarById = createAsyncThunk(
    'seminars/editSeminarById',
    async (seminar: seminarType, thunkApi) => {
        try {
            const response = await axios.put(
                `http://localhost:3000/seminars/${seminar.id}`,
                seminar,
            );
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
);

interface StateSchema {
    seminars: Array<seminarType>;
    isLoading: boolean;
    isLoadingSuccess: boolean;
    isActionSuccess: boolean;
    errMessage: SerializedError | undefined;
}

const initialState: StateSchema = {
    seminars: [],
    isLoading: false,
    isLoadingSuccess: false,
    isActionSuccess: false,
    errMessage: undefined,
};

export const watchSlice = createSlice({
    name: 'watch',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getSeminars.pending, state => {
                state.isLoading = true;
                state.isLoadingSuccess = false;
            })
            .addCase(getSeminars.fulfilled, (state, action) => {
                state.seminars = action.payload;
                state.isLoading = false;
                state.isLoadingSuccess = true;
            })
            .addCase(getSeminars.rejected, (state, action) => {
                state.isLoading = false;
                state.isLoadingSuccess = false;
                state.errMessage = action.error;
            })
            .addCase(deleteSeminarById.pending, state => {
                state.isLoading = true;
                state.isActionSuccess = false;
            })
            .addCase(deleteSeminarById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isActionSuccess = true;
                state.seminars = state.seminars.filter(item => {
                    return item.id !== action.payload;
                });
            })
            .addCase(deleteSeminarById.rejected, (state, action) => {
                state.isLoading = false;
                state.isActionSuccess = false;
                state.errMessage = action.error;
            })
            .addCase(editSeminarById.pending, state => {
                state.isLoading = true;
                state.isActionSuccess = false;
            })
            .addCase(editSeminarById.fulfilled, (state, action) => {
                state.seminars = state.seminars.map(item => {
                    return item.id === action.payload.id
                        ? action.payload
                        : item;
                });
                state.isLoading = false;
                state.isActionSuccess = true;
            })
            .addCase(editSeminarById.rejected, (state, action) => {
                state.isLoading = false;
                state.isActionSuccess = false;
                state.errMessage = action.error;
            });
    },
});
