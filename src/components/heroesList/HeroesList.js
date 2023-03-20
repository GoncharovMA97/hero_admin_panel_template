import {useHttp} from '../../hooks/http.hook';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleted } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const {heroes, heroesLoadingStatus, heroesFilter} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();
    
    const [ heroesList, setHeroesList] = useState([]);

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    const deleteHero = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
                .then(dispatch(heroDeleted(id)))
                .catch(() => dispatch(heroesFetchingError()));       
    }, [request])

    useEffect(() => {
        setHeroesList(heroes);

        setHeroesList(heroes.filter((value) => value.element === heroesFilter || heroesFilter === "all"))

        // eslint-disable-next-line
    }, [heroes, heroesFilter])

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }
    

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} deleteHero={() => deleteHero(id)} {...props}/>
        })
    }

    const elements = renderHeroesList(heroesList);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;