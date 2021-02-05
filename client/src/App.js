import React from 'react';
import { useSelector } from 'react-redux'
import Header from '../src/components/my/Header'
import Sidebar from '../src/components/my/Sidebar'
import Aside from '../src/components/my/Aside'
import Content from '../src/components/my/Content'
import Footer from '../src/components/my/Footer'
import { BrowserRouter } from 'react-router-dom'
import 'materialize-css'

function App() {
  function openMenu() {
    document.querySelector(".sidebar").classList.add("open");
  }
  function closeMenu() {
    document.querySelector(".sidebar").classList.remove("open");
  }


  // const hranilishe = useSelector(state => state)
  // console.log(hranilishe)

  // const { redux_items, redux_category } = useSelector(({ pens, penFilters }) => {
  const {  redux_category } = useSelector(({ pens, penFilters }) => {
    //достаем данн из redux
    return {
      redux_items: pens.pens,
      redux_category: penFilters.category
    }
  })

  //теперь получаем д. асинхронно урок 8 пицца
  // React.useEffect(() => {

  //   if (!redux_items.length) {
  //     dispatch(fetchPens())
  //   }

  // }, [])

  // React.useEffect(() => {
  //   axios.get('http://localhost:5000/pens/list')
  //   //запихиваем в redux массив с данными 
  //     .then(data => { dispatch(setPens(data.data)) });
  // }, [])

  const categories = [
    { name:'Главная', url:'/'},
    { name:'Фурнитура', url:'/pens'},
    { name:'Плинтус', url:'/plintus'},
    { name:'Двери', url:'/doors'}
  ];

  const category = categories[redux_category].name
  return (
    <BrowserRouter>
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

            {/* Route here */}
          <Content
            category={category}
          />

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
