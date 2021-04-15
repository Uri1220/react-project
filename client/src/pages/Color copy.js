import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import LoadingBox from '../components/my/LoadingBox';
import MessageBox from '../components/my/MessageBox';
import { useMessage } from '../hooks/message.hook'

import { saveColor, fetchColors, deleteColor } from '../redux/actions/colorsA';


export default function Color() {

  const [id, setId] = useState('');
  const [colorName, setColorName] = useState('');
  const [colorUrl, setColorUrl] = useState('');
  const [checkColorId, setCheckColorId] = useState('');
  const [aaa, setAaa] = useState([]);
  //  console.log(checkColorId)

  // const setCheckId = (product) => {
  //   setCheckColorId(product)
  // };

  const setCheckId = (product) => {
    setAaa([
      ...aaa, { color_id: product }
    ])
  };
  // console.log(aaa)


  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveColor({
      _id: id,
      colorName,
      colorUrl,
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

  const productDelete = useSelector((state) => state.colorDelete);
  const {
    //redux    //так обозвал
    isLoading: isLoadingDelete,
    success: successDelete,
    // error: errorDelete,
    color: messageDelete
  } = productDelete;

  // React.useEffect(() => {
  //   dispatch(fetchColors());
  // },
  //   [successCreate, successDelete]
  // );

  const openModal = (product) => {
    setId(product._id);
    setColorName(product.colorName);
    setColorUrl(product.colorUrl);

  };
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
    [successCreate]
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

  },
    [successDelete]
  );
  /////////////////////end useMessage Hook/////////////

  return (
    <>
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

              {colors.map((product) => (
                <ul className='colors-item ' key={product._id}>
                  <li>{<img style={{ height: '80px' }} src={product.colorUrl} alt="11" />}</li>
                  <li>
                    {/* <span>
                      <input
                        type="checkbox"
                        id="chetyre"
                      />
                      </span> */}
                    {/* <span>
                      <form action="/complete" method="POST">
                        <label>
                          <input
                            type="checkbox"
                            value={product._id}
                            name="color_id"
                            onChange={(e) => setCheckId(e.target.value)}
                          />
                          <button class="btn btn-small" type="submit">Save</button>
                        </label>
                      </form>
                    </span> */}

                    <span style={{ marginLeft: '3px' }}>{product.colorName}</span>
                  </li>
                  <li>
                    <button className="button" onClick={() => openModal(product)}>
                      Edit
                  </button>{' '}
                    <button
                      className="button"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                  </button>
                  </li>
                </ul>
              ))}

            </div>
          )
      }
    </>

  )
}

