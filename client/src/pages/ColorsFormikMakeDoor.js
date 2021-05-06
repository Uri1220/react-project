import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoadingBox from '../components/my/LoadingBox';

import { fetchColors } from '../redux/actions/colorsA';
import { Formik, Field, Form } from 'formik';


export const ColorsFormikMakeDoor = ({ colors,visible, setVisible }) => {



  // из Formika
  const [col_add, setColAdd] = React.useState([]);

  const [door_image, setDoorImage] = React.useState('');
  const [prom, setProm] = React.useState([]);
  
  //  console.log('col_add',col_add)
  //    console.log('prom',prom)

  // col_add цвета для добавления типа
  //["60505827e8a42c15a25e2de8", "60505988f338d7174aefb40e"]
  // только id

  // из Formika
  // const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const colorslist = useSelector((state) => state.colors);
  const { loading, colors: colors_list } = colorslist;
  const dispatch = useDispatch();
  // color_list - цвета из коллекции возможных цветов
    // console.log('colors_list', colors_list)
    // console.log('colors', colors)

  //загрузка в redux state возможных цветов
  React.useEffect(() => {
    dispatch(fetchColors());
  }, [] )

  //////////////////////////////////////////////

  React.useEffect(() => {
    setVisible(colors)
  }, [colors] )

  React.useEffect(() => {
    setProm(ggg()) 
    
  }, [col_add] )

  React.useEffect(() => {
    if(prom){
      setVisible([...colors,...prom]) 
    }    
    
  }, [prom,colors] )
////////////////////////////////////////////////////

  const deleteHandler = (id) => {
    setVisible(visible.filter(c => c._id !== id))
  }
//тут добавляем картинку двери
  const updateHandler = (id) => {
    setVisible(visible.map((el) => (el._id === id ? { ...el, image: door_image } : el)))
    setDoorImage('')
  }

  //--------------------------------------------------------
  //   ф-ция ggg() получает  полный массив цветов для добавления
  // по выбранным чекбоксам но еще без картинки двери
  // let col_add_completed = []
  function ggg() {
       let col_add_completed = []

    for (let index = 0; index < colors_list.length; index++) {

      for (let index = 0; index < colors_list.length; index++) {
        for (let j = 0; j < col_add.length; j++) {
          if (colors_list[index]._id === col_add[j]) {
            col_add_completed.push({ ...colors_list[index], image: '' })
          }
        }
      }
      return col_add_completed
    }

  }  

  // получить массив без повторения id
  // const a = [
  //   {id: 123, randomvalue: 'hello'}
  //   ]; 
    
  //   const b = [
  //   {id: 123, randomvalue: 'hello', othervalue: 'sup'},
  //   {id: 125, randomvalue: 'sup', othervalue: 'hello'}
  //   ];

  //  console.log( b.filter(o => !a.find(o2 => o.id === o2.id)))

  return (
    <>

      <label htmlFor="newcat"> DoorImage </label>
      <input
        id="a"
        type="text"
        name="door_image"
        value={door_image || ''}
        onChange={(e) => setDoorImage(e.target.value)}
      ></input>


      <div className='details-right-colors'>
        <ul style={{ display: 'flex',flexWrap:'wrap' }}>
          {visible.map((item) => (
            <li style={{ marginRight: '10px', border: '1px solid red' }} key={item._id}>
              <div style={{ fontSize: '15px' }}>{item.colorName}</div>
              <div style={{ display: 'flex' }}>
                <img style={{ height: '40px' }} src={item.colorUrl} alt='no image' />
                image:<img style={{ height: '50px', margin: '0px 10px' }} src={item.image} alt='no image' />

                <button
                  className="small"
                  onClick={() => deleteHandler(item._id)}
                >
                  Delete
                </button>

                <button
                  className="small"
                  onClick={() => updateHandler(item._id)}
                >
                  Update
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="checked-items">       


      </div>
      {
        loading ? (
          <LoadingBox></LoadingBox>
        ) : (
          <div style={{ width: '100%' }}>
            <h1>Выбор цвета</h1>
            <Formik
              initialValues={{
                checked: [],
              }}
              onSubmit={async (values) => {
                // await sleep(500);
                setColAdd(values.checked)
              }}
            >

              <Form>
                <div id="checkbox-group"></div>
                <button type="submit">Выбрать</button>

                <div className="colors-list" role="group" aria-labelledby="checkbox-group">
               
                {/* без повторения */}
                  {
                  ( colors_list.filter(o => !colors.find(o2 => o._id === o2._id))).map((product) => (
                    <ul className='colors-item ' key={product._id}>
                      <li>{<img style={{ height: '80px' }} src={product.colorUrl} alt="11" />}</li>
                      <li>
                        <span>
                          <label>
                            <Field
                              type="checkbox"
                              name="checked"
                              value={product._id}
                            />
                          </label>
                        </span>

                        <span style={{ marginLeft: '3px' }}>
                          {product.colorName}
                        </span>
                      </li>

                    </ul>
                  ))}

                </div>

              </Form>
            </Formik>
          </div>
        )
      }
    </>
  )
};
