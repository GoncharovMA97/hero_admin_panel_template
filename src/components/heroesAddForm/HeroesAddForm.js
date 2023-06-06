import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import {useHttp} from '../../hooks/http.hook';

import { heroCreated, filtersFetchingError, filtersFullFetch } from '../../actions';

const HeroesAddForm = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [element, setElement] = useState('');

    const {filters} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(filtersFullFetch(request));

        // eslint-disable-next-line
    }, []);

    const addCharacter = (e) => {
        e.preventDefault();
        if ( element ) {
            const newChar = {
                id: uuidv4(),
                name,
                description,
                element
            };
            request("http://localhost:3001/heroes", 'POST', JSON.stringify(newChar))
                .then(data => dispatch(heroCreated(data)))
                .catch(() => dispatch(filtersFetchingError()));
            setName('');
            setDescription('');
        };
    }

    const renderOptions = (filters) => {
        return filters.map(({value, name}) => {
            if (value === "all") return <option value="" key={value}>Я владею элементом...</option>;
            return <option value={value} key={value}>{name}</option>;
        })
    }

    return (
        <form onSubmit={e => addCharacter(e)} className="border p-3 shadow-lg rounded">
            <div className="mb-2">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)} 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    style={{"height": '40px'}}/>
            </div>

            <div className="mb-2">
                <label htmlFor="description" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="description"
                    value={description} 
                    onChange={e => setDescription(e.target.value)}
                    className="form-control" 
                    id="description" 
                    placeholder="Что я умею?"
                    style={{"height": '80px'}}/>
            </div>

            <div className="mb-2">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element" 
                    style={{"height": '40px'}}
                    onChange={e => setElement(e.target.value)}>
                    {renderOptions(filters)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;