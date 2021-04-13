import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import LoadingBox from '../components/my/LoadingBox';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDoorDetail } from '../redux/actions/doorsA'
import '../scss/DoorOne.scss'
import ListDown from '../components/my/ListDown'
import Size from '../components/my/Size'
// import { DOORS_LIST_FAIL } from '../redux/constants/doorsConstants';
///////Tooltip//////////
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.black,
    // color: 'rgba(0, 0, 0, 0.87)',
    color: 'white',
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}))(Tooltip);

//////////////////EndTolltip/////////////


function DoorOne(props) {

  const [qty, setQty] = useState(1)
  const [sz, setSz] = useState('')
  const [cl, setCl] = useState('')
  const [s, setS] = React.useState(0) //для цвета active

  // console.log('s', s)
  // console.log('sz', sz)
  // console.log('qty', qty)
  // console.log('cl', cl)

  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(fetchDoorDetail(props.match.params.id))
  }, [dispatch, props.match.params.id])

  const doorDetail = useSelector(state => state.door)
  const { door, isLoading, error } = doorDetail;
  ////  if(door.colors){
  //  console.log('dd', door.colors.length)}

  // console.log((Object.keys(door))
  //  .filter((x) => Array.isArray(door[x])
  //  ))
  // = ["colors"]


  // Object.keys(door)
  //  .filter((x) => Array.isArray(door[x]))
  //   .map((key) => (console.log((door[key][0])._id))) =60505827e8a42c15a25e2de8
  // .map((key) => (console.log('fff',key)))   = colors

  //возвр массив полных картинок
  //Обработка COLORS
  function imageArr() {
    const image_arr = []
    Object.keys(door)
      .filter((x) => Array.isArray(door[x]))
      .map((key) => (
        door[key].map((item) => (
          // console.log('image',item.image)
          image_arr.push(item.image)
        ))
      ))
    return image_arr
  }
  function titleArr() {
    const title_arr = []
    Object.keys(door)
      .filter((x) => Array.isArray(door[x]))
      .map((key) => (
        door[key].map((item) => (
          // console.log('image',item.image)
          title_arr.push(item.colorName)
        ))
      ))
    return title_arr
    // ["Snow Veralinga ", "Bianco Veralinga"]

  }

  const ima = imageArr()
  const tit = titleArr()
  // console.log('image', tit)

  function first() {
    if (door.colors && door.colors.length !== 0) {
      const firstColor = Object.keys(door)
        .filter((x) => Array.isArray(door[x]))
        .map((key) => (((door[key][0]).colorName)))
      // .map((key) => (((door[key][0])._id)))
      return firstColor[0]
      //Snow Veralinga 
    } else {
      return 'no-color'
    }
  }

  const firstColorName = first()
    //  console.log('fc', firstColorName)
  //End Обработка COLORS



  React.useEffect(() => {
    setCl(firstColorName)
  }, [firstColorName])

  const onClickColor = (colorN, i) => {
    setCl(colorN)
    setS(i)
  }

  const handleAddToCart = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty + '=sz=' + sz + '=cl=' + cl);
  };



  return (
    <div className='details-wrapper'>
      {
        isLoading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <div>{error} </div>
        ) : (
          <>
            <button className='button' onClick={props.history.goBack}>Вернуться назад</button>
            <div className='details-info-title'>
              <h1>{door.title} {tit[s]}</h1>
              {/* <h1>{door.title}</h1> */}
            </div>

            <div className="details">
              <div className='details-left'>
                <div className="details-image">
                  <img src={ima[s]} alt="11" />
                  {/* <img src={door.url} alt="11" /> */}
                </div>
              </div>


              <div className="details-right">
                {/* Color */}
                <div className='details-right-colors'>
                  <div className='details-title'>
                    Цвета
                  </div>
                  <div className='details-color-items'>
                    {
                      Object.keys(door)
                        .filter((x) => Array.isArray(door[x]))
                        .map((key) => (
                          // <div   key={door._id}>                            
                          <ul key={door._id} >
                            {door[key].map((item, i) => (
                              <li
                                className={s === i ? 'color color-active' : 'color'}

                                key={item._id}
                              >
                                <LightTooltip title={item.colorName} placement="top">
                                  <img
                                    src={item.colorUrl}
                                    onClick={() => onClickColor(item.colorName, i)}
                                  />
                                </LightTooltip>


                              </li>
                            ))}
                          </ul>
                          // </div>
                        ))
                    }
                  </div>
                </div>
                {/* EndColor */}

                <div className='details-right-price'>
                  <span className='details-title'>
                    Цена
                      </span> <b>{door.price} р.</b>
                </div>
                <div className='details-right-size'>
                  <span className='details-title'>
                    Размер
                      </span>
                  {door.size &&
                    <Size size={door.size} setSz={setSz} />}
                </div>

                <div className='details-right-description'>
                  <div className="des1">
                    {door.description &&
                      <ListDown des={door.description} poz={1} />
                    }
                  </div>
                  <div className='des2'>
                    {door.complect &&
                      <ListDown des={door.complect} poz={0}
                      />
                    }
                  </div>

                </div>

                {/* ACTION */}
                <div className="details-right-action">
                  <ul>
                    <li>
                      Наличие:{' '}
                      {door.countInStock > 0 ? 'Имеется на складе' : 'Под заказ'}
                    </li>

                    <li>
                      Количество:{' '}
                      <select
                        value={qty}
                        onChange={(e) => {
                          setQty(e.target.value);
                        }}
                      >
                        {[...Array(door.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </li>

                    <li>
                      {door.countInStock > 0 && (
                        <button
                          onClick={handleAddToCart}
                          className="btn button primary"
                        >
                          В корзину
                        </button>
                      )}
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </>
        )
      }


    </div>
  )
}

export default DoorOne
