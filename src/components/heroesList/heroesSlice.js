import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesFetching: (state) => {state.heroesLoadingStatus = 'loading'},
        heroesFetched: (state, action) => {
            state.heroes = action.payload;
            state.heroesLoadingStatus = 'idle';
        },
        heroesFetchingError: (state) => {state.heroesLoadingStatus = 'error'},
        heroCreated: (state, action) => {
            state.heroes.push(action.payload);
            state.heroesLoadingStatus = 'idle';
        },
        heroDeleted: (state, action) => {
            const newArr = state.heroes.filter((el)=> el.id !== action.payload)
            return {
                ...state,
                heroes: newArr,
                heroesLoadingStatus: 'idle'
            }
        }
    }
});

const { reducer, actions } = heroesSlice;

export default reducer;
export const { 
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted
} = actions;