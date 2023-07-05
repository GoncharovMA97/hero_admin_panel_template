import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

export const heroesFetch = createAsyncThunk(
    'heroes/heroesFetch',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/heroes");
    }
);

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(heroesFetch.pending, (state) => {state.heroesLoadingStatus = 'loading'})
            .addCase(heroesFetch.fulfilled, (state, action) => {
                state.heroes = action.payload;
                state.heroesLoadingStatus = 'idle';
            })
            .addCase(heroesFetch.rejected, (state) => {state.heroesLoadingStatus = 'error'})
    }
});

const { reducer, actions } = heroesSlice;

export default reducer;
export const {
    heroesFetchingError,
    heroCreated,
    heroDeleted
} = actions;