import React from 'react'
import Door from './Door'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchFilterDoors } from '../redux/actions/doorsA';
import LoadingBox from '../components/my/LoadingBox';
import MessageBox from '../components/my/MessageBox';


function Doors() {
  //получаем пар-ры они пойдут в fetchFilterDoors для запроса 
  //из БД нужных данных
  const {
    category = 'all',
    sub_category = '',
    min = 0,
    max = 0,
  } = useParams();

  // const categories = [
  //   'vchod','ecoshpon','massiv', 'mdf'
  // ]

  const prices = [
    {
      name: 'Any',
      min: 0,
      max: 0,
    },
    {
      name: `$1 to $10`,
      min: 1,
      max: 10,
    },
    {
      name: `$10 to $100`,
      min: 10,
      max: 100,
    },
    {
      name: `$100 to $1000`,
      min: 100,
      max: 1000,
    },
  ];

  const dispatch = useDispatch();

  const [isAdm, setIsAdm] = React.useState(false);

  const doorDetail = useSelector(state => state.doors)
  const { doors, isLoading, error } = doorDetail;

  const userS = useSelector(state => state.userSignin)
  const { userInfo } = userS;



  React.useEffect(() => {
    dispatch(
      fetchFilterDoors({
        //тут при all идет пустота и эта пустота в doorRoute  даст весь список
        category: category !== 'all' ? category : '',
        sub_category,
        min,
        max,
      })
    )
    if (userInfo) {
      setIsAdm(userInfo.isAdmin)
    }
  },
    [category, sub_category, min, max, userInfo]);

  // getFilterUrl нужен для фильтрации по цене
  const getFilterUrl = (filter) => {

    //фильтрация по категории
    // const filterCategory = filter.category || category;

    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;

    // return `/catalog/category/${filterCategory}/min/${filterMin}/max/${filterMax}`;
    return `/doors/category/${category}/sub_category/${sub_category}/min/${filterMin}/max/${filterMax}`;
  };

  // см. ниже:   <Link                    10          100
  //              to={getFilterUrl({ min: p.min, max: p.max })}
  console.log('CAT',category)
console.log('sub',sub_category)



  return (
    <div className="doors">
      <h2>Doors Page</h2>
      {isAdm ? (
        <div className="back-to-result">
          <Link to="/makedoor/">Редактирование</Link>
        </div>) : ('')

      }

      {
        isLoading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) :
          (<>
            {/*  //фильтрация по категории
               <div>
                <ul>
                  <li>
                    <Link
                      className={'all' === category ? 'active' : ''}
                      to={getFilterUrl({ category: 'all' })}
                    >
                      Any
               </Link>
                  </li>
                  {categories.map((c) => (
                    <li key={c}>
                      <Link
                        className={c === category ? 'active' : ''}
                        to={getFilterUrl({ category: c })}
                      >
                        {c}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div> 
              */}

            <div>
              <h3>Price</h3>
              <ul>
                {prices.map((p) => (
                  <li key={p.name}>
                    <Link
                      to={getFilterUrl({ min: p.min, max: p.max })}
                      className={
                        `${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''
                      }
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div>{doors.length} Results</div>
              <div className="products">
                {
                  doors &&
                  doors.map((item) =>
                    <Door key={item._id} door={item} />
                  )
                }
              </div>
            </div>
          </>
          )
      }
    </div>
  )
}

export default Doors

