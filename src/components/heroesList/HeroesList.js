import {useHttp} from '../../hooks/http.hook';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleted } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './heroesList.scss' ;

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
            return (<CSSTransition
                        timeout={0}
                        className='hero'>
                        <h5 className="text-center mt-5">Героев пока нет</h5>
                    </CSSTransition>)
        }

        return arr.map(({id, ...props}) => {
            return (<CSSTransition
                        key={id}
                        timeout={500}
                        classNames="hero">
                        <HeroesListItem deleteHero={() => deleteHero(id)} {...props}/>
                    </CSSTransition>)
        })
    }

    const elements = renderHeroesList(heroesList);
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;