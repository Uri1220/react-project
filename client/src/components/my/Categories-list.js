import React from 'react'
import '../../scss/CategoriesList.scss'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setCategory, setSubCategory, setSub2Cat } from '../../redux/actions/penFiltersA'




const CategoriesList = () => {

  

  const categories = [
    { name: 'Главная', url: '/' },
    { name: 'Двери', },
    { name: 'Фурнитура', },
    { name: 'Плинтус', url: '/plintus' },

  ];
  ///Doors
  const doorsCat = [
    { name: 'Входные' },
    { name: 'Межкомнатные' },
    { name: 'Стеклянные' },
  ];
  const mezDoors = [
    { name: 'Массив', url: '/doors' },
    { name: 'Шпон' },
    { name: 'МДФ' },
  ];
  const vhodDoors = [
    { name: 'Сталь' },
    { name: 'Броня' },
  ];
  const glassDoors = [
    { name: 'Хрусталь' },
    { name: 'Стекло' },
  ];
  //Furnitura
  const furnCat = [
    { name: 'Круг' },
    { name: 'Квадрат' },
  ];
  const krugFurn = [
    { name: 'Круг1', url: '/pens' },
    { name: 'Круг22' },
  ];
  const kvadrFurn = [
    { name: 'Квадрат11' },
    { name: 'Квадрат22' },
  ];

  const cat = useSelector(state => state.penFilters);
  const { category, subCat, subSubCat } = cat;
  // console.log('cat', category)
  // console.log('sub', subCat)

  const dispatch = useDispatch();
  /////////////Category/////////////////////
  const [catArray, setCatArray] = React.useState([])
  // console.log(...catArray)

  const onClickCat = (ind) => {


    dispatch(setCategory(ind))

    switch (ind) {
      case 1:
        setCatArray(doorsCat)
        break
      case 2:
        setCatArray(furnCat)
        break
      // case 3:
      //   setCatArray(PLINTUS)
      //   break
      default:
        setCatArray([])
        break
    }
  }
  ////////////SUB-Category///////////////////////////

  const [subCatArray, setSubCatArray] = React.useState([])
  // console.log(...subCatArray)

  const onClickSubCat = (ind) => {
    dispatch(setSubCategory(ind))
  }

  React.useEffect(() => {
    if (category === 2) {
      switch (subCat) {
        case 1:
          setSubCatArray(krugFurn)
          break
        case 2:
          setSubCatArray(kvadrFurn)
          break
        default:
          setSubCatArray([])
          break
      }
    } else if (category === 1) {
      switch (subCat) {
        case 1:
          setSubCatArray(vhodDoors)
          break
        case 2:
          setSubCatArray(mezDoors)
          break
        case 3:
          setSubCatArray(glassDoors)
          break
        default:
          setSubCatArray([])
          break
      }
    } else {
      setSubCatArray([])
    }
  }, [category, subCat])

  //при переходе на друг категорию
  React.useEffect(() => {
    dispatch(setSubCategory(0))
  }, [category])

  React.useEffect(() => {
    dispatch(setSub2Cat(0))
  }, [subCat])

  ////////////End-SUB-Category//////////////////////

  const onClickInit = (ind) => {
    dispatch(setSub2Cat(ind))
  }


  return (
    <div >
      {/* <h1>Menu</h1> */}

      <div className='menu'>
        {/* /////////111111//////// */}
        <ul className='menu__list' >
          {
            categories &&
            categories.map((obj, index) => (
              <li key={`${obj.name}_${index}`}>

                <Link className='menu__link'
                  to={obj.url}
                  onClick={() => (onClickCat(index))}
                >


                  {obj.name}

                  <svg
                    className={category === index ? 'rotated' : ''}

                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                      fill="#2C2C2C"
                    />
                  </svg>

                </Link>
                {/* /////////222222222 ////////*/}
                <ul
                  //  className="sub-menu__list"
                  className={category === index ? 'sub-menu__list open' : 'sub-menu__list'}

                >
                  {
                    //Входные межкомн или круг квадрат
                    catArray &&
                    catArray.map((obj, index) => (
                      <li key={`${obj.name}_${index}`}>

                        <Link className="sub-menu__link"
                          // to={obj.url}
                          onClick={() => onClickSubCat(index + 1)}
                        >
                          {obj.name}
                        </Link>
                        {/* /////////333333//////// */}
                        <ul
                          //  className="sub-sub-menu__list"
                          className={subCat === index + 1 ? 'sub-sub-menu__list open' : 'sub-sub-menu__list'}

                        >
                          {
                            subCatArray &&
                            subCatArray.map((obj, index) => (
                              <li
                                key={`${obj.name}_${index}`}
                              >
                                <Link
                                  //  className="sub-sub-menu__link"
                                  className={subSubCat === index + 1 ? 'active' : 'sub-sub-menu__link'}
                                  to={obj.url}
                                  onClick={() => onClickInit(index + 1)}
                                >
                                  {obj.name}
                                </Link>

                              </li>
                            )
                            )
                          }
                        </ul>
                        {/* /////////333333//////// */}
                      </li>
                    )
                    )
                  }
                </ul>
                {/* ///////22222222222222///////////// */}

              </li>
            )
            )
          }

        </ul>
        {/* ////////1111111/////// */}

      </div>
    </div>


  )
}


export default CategoriesList

const styles = {
  //   ul:{
  //   display: 'flex',
  //   flexWrap:'wrap',
  //   justifyContent:' space-around',
  //   alignItems: 'center' }
  marginLeft: '2rem',
  transform: 'rotate(180deg)'
}

// style={styles.ul}