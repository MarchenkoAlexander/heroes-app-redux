// import {useHttp} from '../../hooks/http.hook';

// import {Formik, Form, Field, ErrorMessage} from 'formik';
// import * as Yup from 'yup'
// import { v4 as uuidv4 } from 'uuid';
// import { heroAdd } from '../../actions';
// import { useDispatch } from 'react-redux';


// // Задача для этого компонента:
// // Реализовать создание нового героя с введенными данными. Он должен попадать
// // в общее состояние и отображаться в списке + фильтроваться
// // Уникальный идентификатор персонажа можно сгенерировать через uiid
// // Усложненная задача:
// // Персонаж создается и в файле json при помощи метода POST
// // Дополнительно:
// // Элементы <option></option> желательно сформировать на базе
// // данных из фильтров

// const HeroesAddForm = () => {

//     const {request} = useHttp();
//     const dispatch = useDispatch();

//     const postHero = (hero) => { 

//         const {name, text, element} = hero;
//         const id = uuidv4();

//         // dispatch(heroAdd(id, name, text, element))
        
//         request("http://localhost:3001/heroes", "POST", JSON.stringify({
//             id,
//             name,
//             description: text,
//             element
//         }))
//         .then(dispatch(heroAdd(id, name, text, element)))
//         .catch(err => console.log(err))
//     }

//     return (
//        <Formik
//         initialValues={{
//             name: "",
//             text: "",
//             element: "",
//         }}
//         validationSchema={Yup.object({
//             name: Yup.string().required("Введите имя"),
//             text: Yup.string().required("Введите способность"),
//             element: Yup.string().required('Выберите элемент')
//                         .oneOf(["fire", "water", "wind", "earth"])
//         })} 
//         onSubmit={state => postHero(state)}
//        >
//             <Form className="border p-4 shadow-lg rounded">
//                 <div className="mb-3">
//                     <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
//                     <Field 
//                         required
//                         type="text" 
//                         name="name" 
//                         className="form-control" 
//                         id="name" 
//                         placeholder="Как меня зовут?"
//                     />
//                     <ErrorMessage name="name"/>
//                 </div>

//                 <div className="mb-3">
//                     <label htmlFor="text" className="form-label fs-4">Описание</label>
//                     <Field
//                         as="textarea"
//                         required
//                         name="text" 
//                         className="form-control" 
//                         id="text" 
//                         placeholder="Что я умею?"
//                         style={{"height": '130px'}}
//                     />
//                     <ErrorMessage name="text"/>
//                 </div>

//                 <div className="mb-3">
//                     <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
//                     <Field
//                         as="select"
//                         required
//                         className="form-select" 
//                         id="element" 
                    //     name="element">
                    //     <option >Я владею элементом...</option>
                    //     <option value="fire">Огонь</option>
                    //     <option value="water">Вода</option>
                    //     <option value="wind">Ветер</option>
                    //     <option value="earth">Земля</option>
                    // </Field>
                    // <ErrorMessage name="element"/>
//                 </div>

//                 <button type="submit" className="btn btn-primary">Создать</button>
//             </Form>
//        </Formik>
//     )
// }

// export default HeroesAddForm;



// import {useHttp} from '../../hooks/http.hook';
// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { v4 as uuidv4 } from 'uuid';

// import { heroCreated } from '../../actions';

// const HeroesAddForm = () => {
//     const [heroName, setHeroName] = useState('');
//     const [heroDescr, setHeroDescr] = useState('');
//     const [heroElement, setHeroElement] = useState('');

//     const {filters, filtersLoadingStatus} = useSelector(state => state);
//     const dispatch = useDispatch();
//     const {request} = useHttp();

//     const onSubmitHandler = (e) => {
//         e.preventDefault();

//         const newHero = {
//             id: uuidv4(),
//             name: heroName,
//             description: heroDescr,
//             element: heroElement
//         }

//         request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
//             .then(res => console.log(res, 'Отправка успешна'))
//             .then(dispatch(heroCreated(newHero)))
//             .catch(err => console.log(err));

//         setHeroName('');
//         setHeroDescr('');
//         setHeroElement('');
//     }

//     const renderFilters = (filters, status) => {
//         if (status === "loading") {
//             return <option>Загрузка элементов</option>
//         } else if (status === "error") {
//             return <option>Ошибка загрузки</option>
//         }
        
//         if (filters && filters.length > 0 ) {
//             return filters.map(({name, label}) => {
//                 if (name === 'all')  return;

//                 return <option key={name} value={name}>{label}</option>
//             })
//         }

//     return (
//         <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
//             <div className="mb-3">
//                 <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
//                 <input 
//                     required
//                     type="text" 
//                     name="name" 
//                     className="form-control" 
//                     id="name" 
//                     placeholder="Как меня зовут?"
//                     value={heroName}
//                     onChange={(e) => setHeroName(e.target.value)}/>
//             </div>

//             <div className="mb-3">
//                 <label htmlFor="text" className="form-label fs-4">Описание</label>
//                 <textarea
//                     required
//                     name="text" 
//                     className="form-control" 
//                     id="text" 
//                     placeholder="Что я умею?"
//                     style={{"height": '130px'}}
//                     value={heroDescr}
//                     onChange={(e) => setHeroDescr(e.target.value)}/>
//             </div>

//             <div className="mb-3">
//                 <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
//                 <select 
//                     required
//                     className="form-select" 
//                     id="element" 
//                     name="element"
//                     value={heroElement}
//                     onChange={(e) => setHeroElement(e.target.value)}> 
//                     <option value="">Я владею элементом...</option>
//                     {renderFilters(filters, filtersLoadingStatus)}
//                 </select>
//             </div>

//             <button type="submit" className="btn btn-primary">Создать</button>
//         </form>
//     )
// }

// export default HeroesAddForm;


import {useHttp} from '../../hooks/http.hook';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import store from '../../store';

import { selectAll } from '../heroesFilters/filtersSlice';
import { heroCreated } from '../heroesList/heroesSlice'; 

const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState('');
    const [heroDescr, setHeroDescr] = useState('');
    const [heroElement, setHeroElement] = useState('');

    const {filtersLoadingStatus} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();
    const {request} = useHttp();

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDescr,
            element: heroElement
        }

        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
            .then(res => console.log(res, 'Отправка успешна'))
            .then(dispatch(heroCreated(newHero)))
            .catch(err => console.log(err));

        setHeroName('');
        setHeroDescr('');
        setHeroElement('');
    }

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Загрузка элементов</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }
        
        if (filters && filters.length > 0 ) {
            return filters.map(({name, label}) => {
                if (name === 'all')  return;

                return <option key={name} value={name}>{label}</option>
            })
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={heroDescr}
                    onChange={(e) => setHeroDescr(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}>
                    <option value="">Я владею элементом...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;