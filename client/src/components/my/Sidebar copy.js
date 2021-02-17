import React from 'react'
import CategoriesList from './Categories-list'

const Sidebar = ({ closeMenu, categories,activeCategory}) => {
    return (
        <div className="sidebar ">
            <button
                className="sidebar-close-button"
                onClick={closeMenu}
            >x</button>
            
            <CategoriesList
             categories={categories}
             activeCategory = {activeCategory}
              />
        </div>

    )
}
export default Sidebar;
