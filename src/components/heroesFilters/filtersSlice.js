import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook'

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
    activeFilter: 'all',
    filtersLoadingStatus: 'idle',
});

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
        changeFilter: (state, action) => {
            state.filtersLoadingStatus = 'idle';
            state.activeFilter = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(filtersFetch.pending, (state) => {state.filtersLoadingStatus = 'loading'})
            .addCase(filtersFetch.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle';
                filtersAdapter.setAll(state, action.payload);
            })
            .addCase(filtersFetch.rejected, (state) => {state.filtersLoadingStatus = 'error'})
    }
});

const { reducer, actions } = filtersSlice;

export const {selectAll} = filtersAdapter.getSelectors(state => state.filters);

export default reducer;
export const {
    filtersFetchingError,
    changeFilter
} = actions;