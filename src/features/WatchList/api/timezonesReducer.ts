import {
    createAsyncThunk,
    createSlice,
    SerializedError,
} from '@reduxjs/toolkit';
import axios from 'axios';

import { timezoneType } from '@/shared/libs/types';

//  A function to get all timezones from data
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

//  A function to change timezone by id in choosed
//  @params
//  ids: [deleting id, adding id]
export const changeTimezoneById = createAsyncThunk(
    'timezones/changeTimezoneById',
    async (ids: [number, number], thunkApi) => {
        try {
            const response = await axios.get('data/timezones.json');
            return response.data
                .filter((timezone: timezoneType) => {
                    return timezone.id === ids[0];
                })
                .concat(
                    response.data.filter((timezone: timezoneType) => {
                        return timezone.id === ids[1];
                    }),
                );
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
);

//  A function to delete timezone by id from choosed
export const deleteTimezoneById = createAsyncThunk(
    'timezones/deleteTimezoneById',
    async (id: number, thunkApi) => {
        try {
            const response = await axios.get('data/timezones.json');
            return response.data.filter((timezone: timezoneType) => {
                return timezone.id === id;
            })[0];
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
);

//  A function to add timezone by id to choosed
export const addTimezoneById = createAsyncThunk(
    'timezones/addTimezoneById',
    async (id: number, thunkApi) => {
        try {
            const response = await axios.get('data/timezones.json');
            return response.data.filter((timezone: timezoneType) => {
                return timezone.id === id;
            })[0];
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
);

interface StateSchema {
    allTimezones: Array<timezoneType>;
    choosedTimezones: Array<timezoneType>;
    availableTimezones: Array<timezoneType>;
    isLoading: boolean;
}

const initialState: StateSchema = {
    allTimezones: [],
    choosedTimezones: [],
    availableTimezones: [],
    isLoading: false,
};

export const timezonesSlice = createSlice({
    name: 'timezones',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getTimezones.pending, state => {
                state.isLoading = true;
            })
            .addCase(getTimezones.fulfilled, (state, action) => {
                state.allTimezones = action.payload;

                state.choosedTimezones =
                    localStorage.choosedTimezones !== undefined
                        ? JSON.parse(localStorage.choosedTimezones)
                        : state.allTimezones.filter((item: timezoneType) => {
                              return (
                                  item.timezoneOffset ===
                                  -new Date().getTimezoneOffset()
                              );
                          });
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
                localStorage.choosedTimezones = JSON.stringify(
                    state.choosedTimezones,
                );
            })
            .addCase(getTimezones.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(addTimezoneById.pending, state => {
                state.isLoading = true;
            })
            .addCase(addTimezoneById.fulfilled, (state, action) => {
                state.choosedTimezones = [
                    ...state.choosedTimezones,
                    action.payload,
                ];
                state.availableTimezones = state.availableTimezones.filter(
                    (timezone: timezoneType) => {
                        return timezone.id !== action.payload.id;
                    },
                );
                state.isLoading = false;
                localStorage.choosedTimezones = JSON.stringify(
                    state.choosedTimezones,
                );
            })
            .addCase(addTimezoneById.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(deleteTimezoneById.pending, state => {
                state.isLoading = true;
            })
            .addCase(deleteTimezoneById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.choosedTimezones = state.choosedTimezones.filter(
                    (timezone: timezoneType) => {
                        return timezone.id !== action.payload.id;
                    },
                );
                state.availableTimezones = state.allTimezones.filter(
                    (item: timezoneType) => {
                        return state.choosedTimezones.every(timezones => {
                            return item.id !== timezones.id;
                        });
                    },
                );
                localStorage.choosedTimezones = JSON.stringify(
                    state.choosedTimezones,
                );
            })
            .addCase(deleteTimezoneById.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(changeTimezoneById.pending, state => {
                state.isLoading = true;
            })
            .addCase(changeTimezoneById.fulfilled, (state, action) => {
                state.isLoading = false;
                const newChoosedTimezones = JSON.parse(
                    JSON.stringify(state.choosedTimezones),
                );
                const indexOfChangedElement = newChoosedTimezones.findIndex(
                    (timezone: timezoneType) =>
                        timezone.id === action.payload[0].id,
                );
                if (indexOfChangedElement !== -1) {
                    newChoosedTimezones[indexOfChangedElement] =
                        action.payload[1];
                }
                state.choosedTimezones = JSON.parse(
                    JSON.stringify(newChoosedTimezones),
                );
                state.availableTimezones = state.allTimezones.filter(
                    (item: timezoneType) => {
                        return state.choosedTimezones.every(timezones => {
                            return item.id !== timezones.id;
                        });
                    },
                );
                localStorage.choosedTimezones = JSON.stringify(
                    state.choosedTimezones,
                );
            })
            .addCase(changeTimezoneById.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
});
