const initialState = {
    heroesFilter: 'all',
    filters: []
}

const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
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

export default filters;