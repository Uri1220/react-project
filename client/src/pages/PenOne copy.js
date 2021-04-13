import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPenDetail } from '../redux/actions/pensA'
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


function PenOne(props) {

  const [qty, setQty] = useState(1)
  const [cl, setCl] = useState('')
  const [s, setS] = React.useState(0) //для цвета active

  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(fetchPenDetail(props.match.params.id))
  }, [dispatch, props.match.params.id])

  const penDetail = useSelector(state => state.pen)
  const { pen, isLoading, error } = penDetail;


  //Обработка COLORS

  function imageArr() {
    const image_arr = []
    Object.keys(pen)
      .filter((x) => Array.isArray(pen[x]))
      .map((key) => (
        pen[key].map((item) => (
          // console.log('image',item.image)
          image_arr.push(item.image)
        ))
      ))
    return image_arr
  }
  function titleArr() {
    const title_arr = []
    Object.keys(pen)
      .filter((x) => Array.isArray(pen[x]))
      .map((key) => (
        pen[key].map((item) => (
          // console.log('image',item.image)
          title_arr.push(item.colorName)
        ))
      ))
    return title_arr
    // ["Snow Veralinga ", "Bianco Veralinga"]

  }

  const ima = imageArr()
  const tit = titleArr()
  console.log('titles', tit)
  console.log('images', ima)

  function first() {
    if (pen.colors && pen.colors.length !== 0) {
      const firstColor = Object.keys(pen)
        .filter((x) => Array.isArray(pen[x]))
        .map((key) => (((pen[key][0]).colorName)))
      // .map((key) => (((pen[key][0])._id)))
      return firstColor[0]
      //Snow Veralinga 
    } else {
      return 'no-color'
    }
  }

  const firstColorName = first()
  console.log('firstColorName', firstColorName)
  //End Обработка COLORS

  React.useEffect(() => {
    setCl(firstColorName)
  }, [firstColorName])

  const onClickColor = (colorN, i) => {
    setCl(colorN)
    setS(i)
  }


  const handleAddToCart = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty + '=cl=' + cl);
  };
  //  debugger
  //  console.log('e', props.match.path)


  return (
    <div>
      <button onClick={props.history.goBack}>Back</button>
      {
        isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error} </div>
        ) : (

          <div className="details">
            <div className="details-image">
              <img className="product-image" src={pen.url} alt="11" />
              {/* <img className="product-image" src={{ ...obj.pictures[0] }.medium} alt="11" /> */}

            </div>
            <div className="details-info">
              <ul>
                <li>
                  <h4>{pen.title}</h4>
                  {/* <h4>{prod.current.title}</h4> */}
                </li>

                {/* <li>
                  <a href="#reviews">
                    <Rating
                      value={product.rating}
                      text={product.numReviews + ' reviews'}
                    />
                  </a>
                </li> */}

                <li>
                  Price: <b>${pen.price}</b>
                </li>
                {/* <li>
              Description:
                  <div>{product.description}</div>
            </li> */}
              </ul>
            </div>
            <div className="details-action">
              <ul>
                <li>
                  Наличие:{' '}
                  {pen.countInStock > 0 ? 'На складе' : 'Под заказ'}
                </li>

                <li>
                  Qty:{' '}
                  <select
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                  >
                    {[...Array(pen.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </li>

                <li>
                  {pen.countInStock > 0 && (
                    <button
                      onClick={handleAddToCart}
                      className="btn button primary"
                    >
                      Add to Cart
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        )
      }


    </div>
  )
}

export default PenOne
