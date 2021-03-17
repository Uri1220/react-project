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
  /////////////////////////////////////////////
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
              {/* {errorCreate && <div style={{ background: 'red', display: 'inline' }}>{errorCreate}</div>} */}
              {/* {errorCreate && message(errorCreate)} */}
              {/* {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>} */}
              {/* {messageCreate && message(messageCreate.message)} */}
              {/* {messageCreate && <MessageBox  variant="success">{messageCreate.message}</MessageBox>} */}
              {/* {messageCreate && <div style={{ background: 'green', display: 'inline' }}>{messageCreate.message}</div>} */}
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
            <div className="product-list">
              <table className="table">
                <thead>
                  <tr>
                    {/* <th>ColorId</th> */}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {colors.map((product) => (
                    <tr key={product._id}>
                      <td>{<img style={{ height: '60px' }} src={product.colorUrl} alt="11" />}</td>
                      <td>{product.colorName}</td>
                      <td>
                        <button className="button" onClick={() => openModal(product)}>
                          Edit
                  </button>{' '}
                        <button
                          className="button"
                          onClick={() => deleteHandler(product)}
                        >
                          Delete
                  </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
      }
    </>

  )
}
