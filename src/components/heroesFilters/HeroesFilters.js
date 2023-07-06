import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import classNames from 'classnames';

import { changeFilter, selectAll, filtersFetch } from './filtersSlice';
import store from '../../store';

import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {
    const {activeFilter, filtersLoadingStatus} = useSelector((state) => state.filters)
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(filtersFetch());

        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }
    
    const buttonFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }
        return arr.map(({value, name, className})=>{
            const btnClass = classNames('btn', className, {
                'active': value === activeFilter
            });
            return <button 
                        onClick={() => dispatch(changeFilter(value))}
                        key={value}
                        className={btnClass}>
                            {name}
                    </button>
        })
    }
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {buttonFilters(filters)}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;