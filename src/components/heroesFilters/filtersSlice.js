import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: [],
    heroesFilter: 'all',
    filtersLoadingStatus: 'idle',
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFetching: (state) => {state.filtersLoadingStatus = 'loading'},
        filtersFetched: (state, action) => {
            state.filtersLoadingStatus = 'idle';
            state.filters = action.payload;
        },
        filtersFetchingError: (state) => {state.filtersLoadingStatus = 'error'},
        heroesFiltered: (state, action) => {
            state.filtersLoadingStatus = 'idle';
            state.heroesFilter = action.payload;
        }
    }
});

const { reducer, actions } = filtersSlice;

export default reducer;
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    heroesFiltered
} = actions;