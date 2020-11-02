import React from 'react'
// import classNames from 'classnames'

const CategoriesList = ({ categories,activeCategory,setActiveCategory  }) => {

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
    //  const [activeCategory, setActiveCategory] = React.useState(0)
     const onClickCategory =(index) =>{
        setActiveCategory(index)
     }
    return (
        <div className="categories-list">
            <h2 style={styles.h2}>Categories</h2>
            <ul style={styles.ul}>
                {
                    categories &&
                    categories.map((item, index) =>
                        <li
                        className={ activeCategory === index ? 'active' : 'sidebar-link'}

                        // className={`sidebar-link ${ activeCategory === index ? 'active' : ''}` }

                        //  className={classNames( 'sidebar-link',
                        //   {active: activeCategory === index})}

                        //  onClick={() => setActiveCategory(index)}

                         onClick={() => onClickCategory(index)}

                         key={`${item}_${index}`}>                       
                            {item}
                        </li>)}
            </ul>
        </div>

    )
}
export default CategoriesList;
// className={ activeCategory === index ? 'active' : 'sidebar-link'}