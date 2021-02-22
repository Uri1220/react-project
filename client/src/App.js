import React from 'react';
import Header from '../src/components/my/Header'
import Sidebar from '../src/components/my/Sidebar'
import Aside from '../src/components/my/Aside'
import Content from '../src/components/my/Content'
import Footer from '../src/components/my/Footer'
import { BrowserRouter } from 'react-router-dom'
import 'materialize-css'

function App() {

  const [visiblePopup, setVisiblePopup] = React.useState(false);


  function openMenu() {
    setVisiblePopup(true)
  }
  function closeMenu() {
    setVisiblePopup(false)
  }


  React.useEffect(() => {
    if (visiblePopup) {
      document.querySelector(".sidebar").classList.add("open");

    } else {
      document.querySelector(".sidebar").classList.remove("open");
      document.querySelector(".sidebar").classList.add("hide");
      setTimeout(() => {
        document.querySelector(".sidebar").classList.remove("hide")
      }, 200)
    }
  }, [visiblePopup]);



  const array = {
        //category 0-
    categories: [
      { name: 'Распродажа', url: '/' },
      { name: 'Двери', },
      { name: 'Фурнитура', },
      { name: 'Плинтус', url: '/plintus' },
    ],
    //Doors subCat+1
     // ' двери'
    doorsCat: [
      { name: 'Входные',},
      { name: 'Массив',},
      { name: 'Эко Шпон' },
      { name: 'МДФ' },
    ],
    // subSusbCat+1 url: '/-------' 
    vhod_door: [
      { name: 'Сталь', url: '/stal'  },
      { name: 'Броня', url: '/bron'  },
    ],  
    massDoors: [
      { name: 'Classico', url: '/doors' },
      { name: 'Поставы', url: '/' },
      { name: 'Ока', url: '/' },
    ],
    ecoDoors: [
      { name: 'Porta X', url: '/' },
      { name: 'Legno', url: '/' },
      { name: 'Vetro', url: '/' },
    ],
    mdfDoors: [
      { name: 'МДФ Юркас', url: '/' },
    ],
    //Входные двери подкатегории нет!
   
   
    
    //Furnitua
    furnCat: [
      { name: 'Круг' },
      { name: 'Квадрат' },
    ],
    krugFurn: [
      { name: 'Круг1', url: '/pens' },
      { name: 'Круг22' },
    ],
    kvadrFur: [
      { name: 'Квадрат11' },
      { name: 'Квадрат22' },
    ],

  }


  return (
    <BrowserRouter>
      <div className="wrapper">
        <div className="grid-container">
          <Header
            openMenu={openMenu}
          />

          <Sidebar
            array={array}
            closeMenu={closeMenu}
            setVisiblePopup={setVisiblePopup}
          />

          <Aside array={array} />

          {/* Route here */}
          <Content />

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

// // const { redux_items, redux_category } = useSelector(({ pens, penFilters }) => {
  // const {  redux_category } = useSelector(({ pens, penFilters }) => {
  //   //достаем данн из redux
  //   return {
  //     redux_items: pens.pens,
  //     redux_category: penFilters.category
  //   }
  // })
