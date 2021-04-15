import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import LoadingBox from '../components/my/LoadingBox';
import MessageBox from '../components/my/MessageBox';
import { useMessage } from '../hooks/message.hook'
 import RadioColors from '../components/my/RadiuoColors'


import { saveColor, fetchColors, deleteColor } from '../redux/actions/colorsA';


export default function Color() {

  const [id, setId] = useState('');
  const [colorName, setColorName] = useState('');
  const [colorUrl, setColorUrl] = useState('');
  const [value, setValue] = React.useState('door');//door,pen,plint

 //из RadioColors компонента
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  //  console.log('v',value)
  //  console.log('arr',colors_arr)

 
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveColor({
      _id: id,
      colorName,
      colorUrl,
       cat:value
    }))
    setColorUrl('')
  }
  const colorRegister = useSelector(state => state.colorCreate);
  const { isLoading: loadingCreate,
    message: messageCreate,
    error: errorCreate,
    success: successCreate
  } = colorRegister;


  const colorslist = useSelector((state) => state.colors);
  const { loading, colors } = colorslist;
  console.log('colors',colors)



  // console.log(colors)
  const productDelete = useSelector((state) => state.colorDelete);
  const {
    //redux    //так обозвал
    isLoading: isLoadingDelete,
    success: successDelete,
    // error: errorDelete,
    color: messageDelete
  } = productDelete;

  // для редактирования(я убрал)
  // const openModal = (product) => {
  //   setId(product._id);
  //   setColorName(product.colorName);
  //   setColorUrl(product.colorUrl);
  // };
  //Delete
  const deleteHandler = (product) => {
    dispatch(deleteColor(product._id));
  };
  ///////////////useMessage Hook//////////////////////////////
  const dataDelete = useSelector(state => state.colorDelete.color);
  let del = ''
  if (dataDelete) { del = dataDelete.message }

  const dataCreate = useSelector(state => state.colorCreate.message);
  let cre = ''
  if (dataCreate) { cre = dataCreate.message }

  const message = useMessage()
  //create
  React.useEffect(() => {
    dispatch(fetchColors());
    message(cre)
  },
    [successCreate,value]
  );
  //error
  React.useEffect(() => {
    message(errorCreate)
  },
    [errorCreate]
  );
  //delete
  React.useEffect(() => {
    dispatch(fetchColors());
    message(del)

  }, [successDelete]);
  
  /////////////////////end useMessage Hook/////////////

  return (
    <>
    <RadioColors value = {value} handleChange={handleChange}/>
      <div className="form">
        <form
          onSubmit={submitHandler}
        >
          <ul className="form-container">
            <li>
              <h2>Create Color</h2>
            </li>
            <li>
              {loadingCreate || isLoadingDelete && <LoadingBox></LoadingBox>}
              {/* {errorCreate && message(errorCreate)} */}
              {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
              {/* {messageCreate && message(messageCreate.message)} */}
              {messageCreate && <MessageBox variant="success">{messageCreate.message}</MessageBox>}
              {/* { messageDelete  && <MessageBox  variant="success">{messageDelete.message}</MessageBox>} */}
              {/* {messageDelete && message(messageDelete.message)} */}
              {/* {messageDelete && <div style={{ background: 'green', display: 'inline' }}>{messageDelete.message}</div>} */}
            </li>
            <li>
              <label htmlFor="name"> New Color:</label>
              <input
                type="text"
                name="colorName"
                value={colorName}
                id="colorName"
                onChange={(e) => setColorName(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="name"> Color Url:</label>
              <input
                type="text"
                name="colorUrl"
                value={colorUrl}
                id="colorUrl"
                size="50"
                onChange={(e) => setColorUrl(e.target.value)}
              ></input>
            </li>
            <li>
              <button type="submit" className="button primary">Create</button>
            </li>
          </ul>
        </form>
      </div>

      {
        loading || isLoadingDelete || loadingCreate ? (
          <LoadingBox></LoadingBox>
        ) : (
            <div className="colors-list">

              {colors.filter(el=>el.cat === value).map((product) => (
                <div className='colors-item ' key={product._id}>
                  <div><img style={{ height: '80px' }} src={product.colorUrl} alt="11" /></div>
                  <div>
                    <span style={{ marginLeft: '3px' }}>{product.colorName}</span>
                  </div>
                  <div>
                    {/* <button className="button" onClick={() => openModal(product)}>
                      Edit
                  </button>{' '} */}
                 
                    <button
                      className="button"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                  </button>
                  </div>
                </div>
              ))}

            </div>
          )
      }
    </>

  )
}

