import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle'
});

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
            heroesAdapter.addOne(state, action.payload);
            state.heroesLoadingStatus = 'idle';
        },
        heroDeleted: (state, action) => {
            heroesAdapter.removeOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(heroesFetch.pending, (state) => {state.heroesLoadingStatus = 'loading'})
            .addCase(heroesFetch.fulfilled, (state, action) => {
                heroesAdapter.setAll(state, action.payload);
                state.heroesLoadingStatus = 'idle';
            })
            .addCase(heroesFetch.rejected, (state) => {state.heroesLoadingStatus = 'error'})
    }
});
const { selectAll } = heroesAdapter.getSelectors((state) => state.heroes);

export const filteredHeroesSelector = createSelector(
    (state) => state.filters.activeFilter,
    selectAll,
    (filter, heroes) => {
        if (filter === 'all') {
            return heroes;
        } else {
            return heroes.filter(item => item.element === filter);
        }
    }
)

const { reducer, actions } = heroesSlice;

export default reducer;
export const {
    heroesFetchingError,
    heroCreated,
    heroDeleted
} = actions;