import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPenDetail } from '../redux/actions/pensA'
import axios from 'axios'

function PenOne(props) {



  const dispatch = useDispatch()
  // const id = props.match.params.id
  // dispatch(fetchPenDetail( props.match.params.id));
  // dispatch({ type: PEN_DETAILS_REQUEST,payload: penId })
  // axios.get('http://localhost:5000/pens/' + id)
  //  .then(data => { console.log( data.data) });
  //  .then(data => { dispatch({ type: PEN_DETAILS_SUCCESS, payload: data.data }) });
  React.useEffect(() => {
    // dispatch(fetchPens()) ПОЛУЧАЕМ ДАННЫЕ
    // if (!pens_items.length) {
    dispatch(fetchPenDetail(props.match.params.id))
    // }
  }, [])
  const penDetail = useSelector(state => state.pen)
  const { pen, isLoading, error } = penDetail;
  const obj1 = penDetail.pen
  // console.log('111', obj1)
  // console.log('pen',pen)
  // console.log('isLoading',isLoading)
  // console.log('error',error)

  const pic = {...pen.pictures}[0]
  const str = JSON.stringify(pic,['medium'])

 const st1 = JSON.stringify(pic, function(key, value) {
    if (key === 'medium' || key === 'original') {
      return undefined; // удаляем все строковые свойства
    }
    return value;
  });
  
  console.log('picture',st1)
  console.log(typeof(st1))
  const st2 = 'hjhjhjhj'
  //  st1.slice(1,3)
   console.log(st1.toString().slice(1,4))
  //  var myobj = JSON.parse(JSON.parse(st1))
  //  console.log('pic',myobj)


  // for (let key in pic) {
    // ключи
    // значения ключей
    // console.log( pic[key] ); 
    // John, 30, true
  // }
  // console.log('picture',str)
 
  // console.log('typeof',typeof(str))
  // var obj = { 0: 'a', 1: 'b', 2: 'c' };
 //  console.log('aaa',aaa)
  // useEffect(()=>{
  //   dispatch(fetchPenDetail( props.match.params.id));
  //   return () => {
  //     //
  //   };

  // },[])


  ///////////////////РАБОТАЕТ////////////////
  const { pens_items } = useSelector(({ pens }) => {
    //достаем данн из   redux
    return {
      pens_items: pens.pens,
    }
  })
  let obj = pens_items.find(x => x._id === props.match.params.id)
  // console.log('222',obj)





  // const [prod,setProd] = useState({})
  // console.log('My object: ', obj)
  // console.log(typeof obj)
  // console.log(obj.title)
  // console.log(prod.current.title)
  //  const str = JSON.stringify(obj);
  // str = JSON.stringify(obj, null, 4); // (Optional) beautiful indented output.
  //  console.log(str); // Logs output to dev tools console.
  //  alert("myObject is " + obj.toSource());

  // const handleAddToCart = () => { }


  return (
    <div>
      <div className="back-to-result">
        <Link to="/pens/">Back to result</Link>
      </div>
      {
        isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error} </div>
        ) : (

              <div className="details">
                <div className="details-image">

                  {/* <img className="product-image" src={{ ...pen.pictures[0] }.medium} alt="11" /> */}
                  {/* <img className="product-image" src={{ ...obj.pictures[0] }.medium} alt="11" /> */}

                </div>
                <div className="details-info">
                  <ul>
                    <li>
                      <h4>{pen.title}</h4>
                      {/* <h4>{obj.title}</h4> */}

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
                      {/* Price: <b>${obj.price}</b> */}
                    </li>
                    {/* <li>
              Description:
                  <div>{product.description}</div>
            </li> */}
                  </ul>
                </div>
                <div className="details-action">
                  <ul>
                    {/* <li>Price: {product.price}</li> */}
                    {/* <li>
              Status:{' '}
              {product.countInStock > 0 ? 'In Stock' : 'Unavailable.'}
            </li> */}

                    {/* <li>
                  Qty:{' '}
                  <select
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </li> */}

                    <li>
                      {/* {product.countInStock > 0 && (
                <button
                  onClick={handleAddToCart}
                  className="button primary"
                >
                  Add to Cart
                </button>
              )} */}
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
