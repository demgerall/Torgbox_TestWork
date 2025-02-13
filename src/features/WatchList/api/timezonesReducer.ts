import {
    createAsyncThunk,
    createSlice,
    SerializedError,
} from '@reduxjs/toolkit';
import axios from 'axios';

import { timezoneType } from '@/shared/libs/types';
import { c } from 'node_modules/framer-motion/dist/types.d-6pKw1mTI';

//  A function to get all seminars from server data
export const getTimezones = createAsyncThunk(
    'timezones/getTimezones',
    async (__, thunkApi) => {
        try {
            const response = await axios.get('data/timezones.json');
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
);

//  A function to delete seminar by id from server data
// export const deleteTimezonesById = createAsyncThunk(
//     'timezones/deleteTimezonesById',
//     async (id: number, thunkApi) => {
//         try {
//             await axios.delete(`http://localhost:3000/seminars/${id}`);
//             return id;
//         } catch (error) {
//             console.error(error);
//             throw error;
//         }
//     },
// );

// export const addTimezonesById = createAsyncThunk(
//     'timezones/addTimezonesById',
//     async (__, thunkApi) => {
//         try {
//             const response = await axios.put(
//                 `http://localhost:3000/seminars/${seminar.id}`,
//                 seminar,
//             );
//             return response.data;
//         } catch (error) {
//             console.error(error);
//             throw error;
//         }
//     },
// );

interface StateSchema {
    allTimezones: Array<timezoneType>;
    choosedTimezones: Array<timezoneType>;
    availableTimezones: Array<timezoneType>;
    isLoading: boolean;
    isLoadingSuccess: boolean;
    errMessage: SerializedError | undefined;
}

const initialState: StateSchema = {
    allTimezones: [],
    choosedTimezones: [],
    availableTimezones: [],
    isLoading: false,
    isLoadingSuccess: false,
    errMessage: undefined,
};

export const timezonesSlice = createSlice({
    name: 'timezones',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getTimezones.pending, state => {
                state.isLoading = true;
                state.isLoadingSuccess = false;
            })
            .addCase(getTimezones.fulfilled, (state, action) => {
                state.allTimezones = action.payload;
                state.choosedTimezones = state.allTimezones.filter(
                    (item: timezoneType) => {
                        return (
                            item.timezoneOffset ===
                            -new Date().getTimezoneOffset()
                        );
                    },
                );
                state.availableTimezones = state.allTimezones.filter(
                    (item: timezoneType) => {
                        return state.choosedTimezones.every(timezones => {
                            return (
                                item.timezoneOffset !== timezones.timezoneOffset
                            );
                        });
                    },
                );
                state.isLoading = false;
                state.isLoadingSuccess = true;
            })
            .addCase(getTimezones.rejected, (state, action) => {
                state.isLoading = false;
                state.isLoadingSuccess = false;
                state.errMessage = action.error;
            });
        // .addCase(deleteSeminarById.pending, state => {
        //     state.isLoading = true;
        //     state.isActionSuccess = false;
        // })
        // .addCase(deleteSeminarById.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     state.isActionSuccess = true;
        //     state.seminars = state.seminars.filter(item => {
        //         return item.id !== action.payload;
        //     });
        // })
        // .addCase(deleteSeminarById.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.isActionSuccess = false;
        //     state.errMessage = action.error;
        // })
        // .addCase(editSeminarById.pending, state => {
        //     state.isLoading = true;
        //     state.isActionSuccess = false;
        // })
        // .addCase(editSeminarById.fulfilled, (state, action) => {
        //     state.seminars = state.seminars.map(item => {
        //         return item.id === action.payload.id
        //             ? action.payload
        //             : item;
        //     });
        //     state.isLoading = false;
        //     state.isActionSuccess = true;
        // })
        // .addCase(editSeminarById.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.isActionSuccess = false;
        //     state.errMessage = action.error;
        // });
    },
});
