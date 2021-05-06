import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoadingBox from '../components/my/LoadingBox';

import { fetchColors } from '../redux/actions/colorsA';
import { Formik, Field, Form } from 'formik';


export const ColorsFormikMakeDoor = ({ colFinish, setColFinish }) => {



  // из Formika
  const [col_add, setColAdd] = React.useState([]);
  const [door_image, setDoorImage] = React.useState('');
  // door_image-url картинки двери для добавления
  


  // col_add цвета для добавления типа
  //["60505827e8a42c15a25e2de8", "60505988f338d7174aefb40e"]
  // только id

  //  console.log('door_image', door_image)

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


  const deleteHandler = (id) => {
    setColFinish(colFinish.filter(c => c._id !== id))
  }
//тут добавляем картинку двери
  const updateHandler = (id) => {
    setColFinish(colFinish.map((el) => (el._id === id ? { ...el, image: door_image } : el)))
    setDoorImage('')
  }

  //--------------------------------------------------------
  //   ф-ция ggg() получает  полный массив цветов для добавления
  // по выбранным чекбоксам но еще без картинки двери
  let col_add_completed = []
  function ggg() {
    for (let index = 0; index < colors_list.length; index++) {

      for (let index = 0; index < colors_list.length; index++) {
        for (let j = 0; j < col_add.length; j++) {
          if (colors_list[index]._id === col_add[j]) {
            col_add_completed.push(colors_list[index])
            // col_add_completed.push({ ...colors_list[index], cheked: true })
          }
        }
      }
      return col_add_completed
    }

  }
  // col_add_completed полный массив для добавления по выбранным
  //чекбоксам

  if (col_add.length && colors_list.length) {
    ggg()
  }
  // console.log('col_add_completed', col_add_completed)

  //---------------------------------------------------------------


  const setColors = () => {

    //  const unique = [...new Set(aaa.map(item => item._id))];
    //  console.log('uniq',unique)

    // colFinish - здесь пока цвета из БД 
    //получаем только массив из _id
    const uniqIds = colFinish.map(item => item._id)
    //  console.log('uniqIds',uniqIds)

    //получаем массив уникальных значений типа 
    //["60505827e8a42c15a25e2de8", "60505988f338d7174aefb40e"]
    //  из старых(из БД)  и новых (col_add) айдишников цветов 
    const un = [...new Set([...uniqIds, ...col_add])]
    // console.log('un',un)
    let col_a = []
    //col_a - полный массив на основе un
    function g() {
      for (let index = 0; index < colors_list.length; index++) {

        for (let index = 0; index < colors_list.length; index++) {
          for (let j = 0; j < un.length; j++) {
            if (colors_list[index]._id === un[j]) {
              col_a.push({ ...colors_list[index], image: '' })
              // col_a.push(colors_list[index])
              // col_add_completed.push({ ...colors_list[index], cheked: true })
            }
          }
        }
        return col_a
      }

    }
    g()
    // console.log('yy',col_a)
    setColFinish(col_a)

  };

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
          {colFinish.map((item) => (
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

        <button
          type="button"
          onClick={() => setColors()}
          className="small"
        >
          Сохранить
        </button>

        {/* <div>Выбранные цвета:</div> */}
        <ul style={{ display: 'flex' }}>
          {col_add_completed.map((item) => (
            <li style={{ marginRight: '10px', border: '1px solid red' }} key={item._id}>
              <div style={{ fontSize: '15px' }}>{item.colorName}</div>
              <div style={{ display: 'flex' }}>
                <img style={{ height: '40px', border: '1px solid blue' }} src={item.colorUrl} />
                <div>image:{item.image}</div>
              </div>
            </li>
          ))}
        </ul>


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


                  {colors_list.map((product) => (
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
