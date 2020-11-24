import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Header from '../src/components/my/Header'
import Sidebar from '../src/components/my/Sidebar'
import Aside from '../src/components/my/Aside'
import Content from '../src/components/my/Content'
import Footer from '../src/components/my/Footer'
import axios from 'axios'
import { setPens } from '../src/redux/actions/pensA'

function App() {
  function openMenu() {
    document.querySelector(".sidebar").classList.add("open");
  }
  function closeMenu() {
    document.querySelector(".sidebar").classList.remove("open");
  }

  const dispatch = useDispatch();
  
  // const hranilishe = useSelector(state => state)
  // console.log(hranilishe)

  const { redux_items, redux_category } = useSelector(({ pens, penFilters }) => { 
    //достаем данн из redux
    return {
      redux_items: pens.pens,
      redux_category: penFilters.category
    }
  })


  React.useEffect(() => {
    axios.get('http://localhost:5000/pens/list')
    //запихиваем в redux массив с данными 
      .then(data => { dispatch(setPens(data.data)) });
  }, [])

  const categories = ['Фурнитура', 'Плинтус', 'Двери'];

  const category = categories[redux_category]
  return (
    <div className="wrapper">
      <div className="grid-container">
        <Header openMenu={openMenu} />

        <Sidebar
          closeMenu={closeMenu}
          categories={categories}
          activeCategory={redux_category}
        />

        <Aside
          activeCategory={redux_category}
          categories={categories}
        />

        <Content pens={redux_items} category={category} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
