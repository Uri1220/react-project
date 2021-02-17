import React from 'react'
import CategoriesList from './Categories-list'
import '../../scss/Sidebar.scss'

const Sidebar = ({ closeMenu,setVisiblePopup}) => {

  const sortRef = React.useRef();

  const handleOutsideClick = (event) => {
    const path = event.path || (event.composedPath && event.composedPath());
    if (!path.includes(sortRef.current)) {
       setVisiblePopup(false);
    }
  };
  React.useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);

  }, []);
    return (
      
        <div ref={sortRef} className="sidebar ">
            <span
                className="sidebar-close-button"
                onClick={closeMenu}
             >&times;</span> 
           
            <CategoriesList/>
        </div>
       
        
    )
}
export default Sidebar;
