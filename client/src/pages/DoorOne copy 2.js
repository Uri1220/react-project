import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/my/LoadingBox';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDoorDetail } from '../redux/actions/doorsA'
import '../scss/DoorOne.scss'


function DoorOne(props) {

  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(fetchDoorDetail(props.match.params.id))
  }, [dispatch, props.match.params.id])

  const doorDetail = useSelector(state => state.door)
  const { door, isLoading, error } = doorDetail;


  const handleAddToCart = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
  };
  // //////////////////////////////////////////////////
  const arr = String(door.description).split('=')

  const rrr = arr.map((el, i) => i % 2 === 0 ? { name: el } : { value: el }

  )




  // console.log(Array.from(arr));

  // console.log(Array.from(arr, x => x + x));
  // expected output: Array [2, 4, 6]



  const [des, setDes] = useState(
    {
      proper: '',
      val: ''
    })

  // function twoPar(array) {
  //   const result= []
  //   const rab = []
  //   for (var i = 0; i < array.length; i++) {

  //     for (var j = 0; j < array.length; j++) {
  //       rab.push(array[j])

  //     }

  //     }
  //   }


  //  const arrKeys = arr.map((el,i) => i%2 ? el : '')

  // console.log('arr', des)

  function updateProp(p) {
    setDes(prev => {
      return {
        ...prev,
        proper: p
      }
    })
  }
  // updateProp('hhhjhjhj')
  React.useEffect(() => {

  }, []

  )

  function makeDes(array) {

    for (var i = 0; i < array.length; i++) {
      if (i % 2 === 0) {
        updateProp(`${array[i]}`)
      }
    }
  }
  // makeDes(arr)


  function makeProperty(array) {
    let property = []
    for (var i = 0; i < array.length; i++) {
      if (i % 2 === 0) {
        property.push(array[i])
      }
    }
    return property
  }
  function makeValue(array) {
    let value = []
    for (var i = 0; i < array.length; i++) {
      if (i % 2) {
        value.push(array[i])
      }
    }
    return value
  }

  const property = makeProperty(arr)
  const value = makeValue(arr)


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
                  <h1>{door.title}</h1>
                </div>

                <div className="details">
                  <div className='details-left'>
                    <div className="details-image">
                      <img src={door.url} alt="11" />
                    </div>



                  </div>

                  <div className="details-right">


                    <div className='details-right-price'>
                      Price: <b>${door.price}</b>
                    </div>

                    <div className='details-right-description'>
                      Description:
                      <div className="product-list">
                        <table className="table">
                          <thead>
                            <tr>
                              {/* <th>Title</th>
                              <th>Price</th>
                              <th>Category</th>
                              <th>Sub-Category</th>
                              <th>ColorId</th>
                              <th>Action</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {rrr.map((el, i) => (
                              <tr key={i}>
                                <td><span>{el.name}</span> <span>{el.value}</span> </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                      </div>
                    </div>

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
