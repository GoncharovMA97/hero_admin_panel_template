import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const [activeValue, setActiveValue] = useState('');

    const {filters} = useSelector(state => state);

    const buttonFilters = filters.map(({value, name, className})=>{
        const active = value === activeValue;
        const clazz = active ? className + ' active' : className
        return <button 
                    onClick={() => setActiveValue(value)} 
                    value={value} 
                    key={value} 
                    className={clazz}>
                        {name}
                </button>
    })

    console.log(activeValue);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {buttonFilters}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;