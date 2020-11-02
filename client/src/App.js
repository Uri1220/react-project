import React, {useState} from 'react';
import Header from '../src/components/my/Header'
import Sidebar from '../src/components/my/Sidebar'
import Aside from '../src/components/my/Aside'
import Content from '../src/components/my/Content'
import Footer from '../src/components/my/Footer'


function App() {
  function openMenu() {
    document.querySelector(".sidebar").classList.add("open");
  }
  function closeMenu() {
    document.querySelector(".sidebar").classList.remove("open");
  }

  const [categories, setCategories] = useState(['Фурнитура','Плинтус','Двери']);
    // console.log(categories)

    const [activeCategory, setActiveCategory] = React.useState(0)
    // console.log(categories[activeCategory])
    const category = categories[activeCategory]
  return (
    <div className="wrapper">
      <div className="grid-container">
        <Header openMenu = {openMenu}/>
        <Sidebar
         closeMenu = {closeMenu}
         categories = {categories}
         activeCategory = {activeCategory}
         setActiveCategory ={setActiveCategory}
         />
        <Aside 
        activeCategory = {activeCategory}
        categories = {categories}
        setActiveCategory ={setActiveCategory}
        />
        <Content category = {category}/> 
        <Footer/> 
      </div>
    </div>
  );
}

export default App;
