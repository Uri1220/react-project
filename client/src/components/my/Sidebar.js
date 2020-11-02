import React from 'react'
import CategoriesList from './Categories-list'

const Sidebar = ({ closeMenu, categories,activeCategory,setActiveCategory  }) => {
    return (
        <div className="sidebar ">
            <button
                className="sidebar-close-button"
                onClick={closeMenu}
            >x</button>
            
            <CategoriesList
             categories={categories}
             activeCategory = {activeCategory}
             setActiveCategory ={setActiveCategory}
              />
        </div>

    )
}
export default Sidebar;
