import React from 'react'
import { useDispatch } from 'react-redux'
import { setPenCategory } from '../../redux/actions/penFiltersA'
import { Link } from 'react-router-dom'

// а здесь приходит выбранная категория, она идет из redux
const CategoriesList = ({ categories, activeCategory }) => {

    // console.log(categories)

    // console.log(activeCategory)
    // let link = categories[activeCategory].url
    // console.log(link)



    const dispatch = useDispatch();
    //здесь запись в redux выбранной категории
    const onClickCategory = (ind) => {
        dispatch(setPenCategory(ind))
    }
    return (
        <div className="categories-list">
            <h2 style={styles.h2}>Categories</h2>
            <ul style={styles.ul}>
                {
                    categories &&
                    categories.map((obj, index) => (
                        <Link
                            to={obj.url}
                            key={`${obj.name}_${index}`}
                        >

                            <li
                                //здесь выбранная кат подкрашивается
                                className={activeCategory === index ? 'active' : 'sidebar-link'}
                                //здесь начало записи в redux
                                onClick={() => onClickCategory(index)}
                            >
                                {obj.name}
                            </li>
                        </Link>
                    )
                    )
                }
            </ul>
        </div>


    )
}


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
export default CategoriesList;
