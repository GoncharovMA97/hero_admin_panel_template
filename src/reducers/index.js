const initialState = {
    heroes: [],
    heroesFilter: '',
    heroesLoadingStatus: 'idle',
    filters: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HEROES_CREATED':
            const newHero = [...state.heroes, action.payload]
            return {
                ...state,
                heroes: newHero,
                heroesLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HERO_DELETED':
            const newArr = state.heroes.filter((el)=> el.id !== action.payload)
            return {
                ...state,
                heroes: newArr,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FILTERED':
            return {
                ...state,
                heroesFilter: action.payload,
                heroesLoadingStatus: 'idle'
            }
        default: return state
    }
}

export default reducer;