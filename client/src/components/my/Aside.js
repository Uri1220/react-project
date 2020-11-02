import React from 'react'
import CategoriesList from './Categories-list'

const Aside = ({categories,activeCategory,setActiveCategory }) => {
  
  return (
    <div className="aside">
       
        <CategoriesList 
        categories={categories}
        activeCategory = {activeCategory}
         setActiveCategory ={setActiveCategory}
          />
    </div>

  )
}
export default Aside;