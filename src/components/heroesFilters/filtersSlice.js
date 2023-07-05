import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook'

const initialState = {
    filters: [],
    heroesFilter: 'all',
    filtersLoadingStatus: 'idle',
}

export const filtersFetch = createAsyncThunk(
    'filters/filtersFetch',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/filters");
    }
);

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFetchingError: (state) => {state.filtersLoadingStatus = 'error'},
        heroesFiltered: (state, action) => {
            state.filtersLoadingStatus = 'idle';
            state.heroesFilter = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(filtersFetch.pending, (state) => {state.filtersLoadingStatus = 'loading'})
            .addCase(filtersFetch.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle';
                state.filters = action.payload;
            })
            .addCase(filtersFetch.rejected, (state) => {state.filtersLoadingStatus = 'error'})
    }
});

const { reducer, actions } = filtersSlice;

export default reducer;
export const {
    filtersFetchingError,
    heroesFiltered
} = actions;