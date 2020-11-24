import React from 'react'
import { useDispatch } from 'react-redux'
import { setPenCategory } from '../../redux/actions/penFiltersA'


const CategoriesList = ({ categories, activeCategory}) => {

    const dispatch = useDispatch();

    const styles = {
        ul: {
            border: '1px solid blue',
            marginTop: 18,
        },
        h2: {
            textAlign: 'center',
            marginTop: 15
        }
    }


    const onClickCategory = (index) => {
        dispatch(setPenCategory(index))
    }
    return (
        <div className="categories-list">
            <h2 style={styles.h2}>Categories</h2>
            <ul style={styles.ul}>
                {
                    categories &&
                    categories.map((item, index) =>
                        <li
                            className={activeCategory === index ? 'active' : 'sidebar-link'}

                            onClick={() => onClickCategory(index)}

                            key={`${item}_${index}`}>
                            {item}
                        </li>)}
            </ul>
        </div>

    )
}
export default CategoriesList;
