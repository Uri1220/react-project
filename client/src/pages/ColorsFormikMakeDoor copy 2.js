import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoadingBox from '../components/my/LoadingBox';

import { fetchColors } from '../redux/actions/colorsA';
import { Formik, Field, Form } from 'formik';

export const ColorsFormikMakeDoor = ({ colFinish, setColFinish }) => {

  // из Formika
  const [col_add, setColAdd] = React.useState([]);

  const [re, setRe] = React.useState([]);//окончат массив со всеми картинками

  const [door_image, setDoorImage] = React.useState('');
  // door_image-url картинки двери для добавления

  // col_add цвета для добавления типа
  //["60505827e8a42c15a25e2de8", "60505988f338d7174aefb40e"]
  // только id

   console.log('colFinish', colFinish)
  //  console.log('re', re)
   console.log('col_add', col_add)

  // const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const colorslist = useSelector((state) => state.colors);
  const { loading, colors: colors_list } = colorslist;
  const dispatch = useDispatch();
  // color_list - цвета из коллекции возможных цветов
  //  console.log('colors_list', colors_list)

  //загрузка в redux state возможных цветов
  React.useEffect(() => {
    dispatch(fetchColors());
  }, []
  )

  React.useEffect(() => {
    setColFinish(re)
    setColAdd([])
  }, [re]
  )

  const deleteHandler = (id) => {
    setColFinish(colFinish.filter(c => c._id !== id))
  }
  //тут добавляем картинку двери
  const updateHandler = (id) => {
    setRe(result.map((el) => (el._id === id ? { ...el, image: door_image } : el)))
    // setColFinish(result.map((el) => (el._id === id ? { ...el, image: door_image } : el)))
    setDoorImage('')
  }

  //--------------------------------------------------------
  //   ф-ция ggg() получает  полный массив цветов для добавления
  // по выбранным чекбоксам но еще без картинки двери и без проверки
  // на уникальность
   let col_add_completed = []
  function ggg() {    

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

  if (col_add.length && colors_list.length) {
    ggg()
  }
   console.log('col_add_completed', col_add_completed)
// -----------------------------------------------------
// ddd складыват м из базы с картинками дверей
// с м в кот еще нет картинок
    let result = [...colFinish]
  function ddd() { 

    if(colFinish.length) {

      for (let index = 0; index < colFinish.length; index++) {

        for (let index = 0; index < colFinish.length; index++) {
          for (let j = 0; j < col_add_completed.length; j++) {
            if (colFinish[index]._id !== col_add_completed[j]._id) {
               result.push(col_add_completed[j])           
  
            }
          }
        }
      }
    } else{
       result = [...col_add_completed]
    } 
     return result 
  }
 ddd()

 console.log('result', result)  

  return (
    <>
      {/* ==================Input for image============== */}
      <label htmlFor="newcat"> DoorImage </label>
      <input
        id="a"
        type="text"
        name="door_image"
        value={door_image || ''}
        onChange={(e) => setDoorImage(e.target.value)}
      ></input>

      {/* ===================Форма============== */}
      <div className='details-right-colors'>
        <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
          {result.map((item,i) => (
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

      {/* ====================Выбор цвета======================== */}
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


                  {colors_list.map((product,i) => (
                    <ul className='colors-item '  key={`${product._id}_${i}`}>
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
