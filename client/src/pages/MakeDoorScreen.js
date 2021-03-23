import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import LoadingBox from '../components/my/LoadingBox';
import { saveProduct, fetchFilterDoors, deleteProdcut, } from '../redux/actions/doorsA';
import { array } from '../data.js'

function MakeDoorScreen() {

  ///////Select
  const doorsCat = array.doorsCat.map(el => {
    return el.db
  })
  doorsCat.unshift('')
  //пробелы чтоб в <select/> первая поз была пустая
  // const doorsCat = ['', 'Входные','Массив','Эко Шпон' ,'МДФ']
  const vhod_door = array.vhod_door.map(el => {
    return el.db
  })
  vhod_door.unshift('')
  const massDoors = array.massDoors.map(el => {
    return el.db
  })
  massDoors.unshift('')
  const ecoDoors = array.ecoDoors.map(el => {
    return el.db
  })
  ecoDoors.unshift('')
  const mdfDoors = array.mdfDoors.map(el => {
    return el.db
  })
  mdfDoors.unshift('')

  let sub_categories = []

  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [url, setUrl] = useState('');
  const [size, setSize] = useState('');
  const [category, setCategory] = useState('');
  const [sub_category, setSubCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [complect, setComplect] = useState('');
  const [upisLoading, setUpisLoading] = useState(false);

  //   doorsCat: [
  //     { name: 'Входные', },
  //     { name: 'Массив', },
  //     { name: 'Эко Шпон' },
  //     { name: 'МДФ' },
  //  ],
  // console.log('sub-array',sub_categories)
  if (category === array.doorsCat[0].db) {
    sub_categories = [...vhod_door]
  } else if (category === array.doorsCat[1].db) {
    sub_categories = [...massDoors]
  } else if (category === array.doorsCat[2].db) {
    sub_categories = [...ecoDoors]
  } else if (category === array.doorsCat[3].db) {
    sub_categories = [...mdfDoors]
  }
  //-------------------select-----------------
  const doorslist = useSelector((state) => state.doors);
  const { isLoading, doors, error } = doorslist;



  const doorSave = useSelector((state) => state.doorSave);
  const {
    isLoading: isLoadingSave,
    success: successSave,
    error: errorSave,
  } = doorSave;

  const productDelete = useSelector((state) => state.doorDelete);
  const {
    //redux    //так обозвал
    isLoading: isLoadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    //без dispatch отображаемся уже отфильтрованные двери
    //а с dispatch -все

    // dispatch(fetchDoors());
    dispatch(fetchFilterDoors(
      {
        category: v[0],
        sub_category: s[0],
        min: 0,
        max: 0,
      }
    ));

  }, [successSave, successDelete]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setTitle(product.title);
    setPrice(product.price);
    setDescription(product.description);
    setComplect(product.complect);
    setUrl(product.url);
    setSize(product.size);
    setCategory(product.category);
    setSubCategory(product.sub_category);
    setCountInStock(product.countInStock);
  };
  //SAVE////
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        title,
        price,
        url,
        size,
        category,
        sub_category,
        countInStock,
        description,
        complect,
        // colors
      })
    );
  };
  //Delete
  const deleteHandler = (product) => {
    dispatch(deleteProdcut(product._id));
  };
  //
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('url', file);
    setUpisLoading(true);
    axios
      .post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setUrl(response.data);
        setUpisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setUpisLoading(false);
      });
  };
  //определяем кат и субкат чтоб задать значения по умолч стрю170
  // и для перерендера списка стр.93
  const v = doors.map(el => {
    return el.category
  })
  const s = doors.map(el => {
    return el.sub_category
  })

  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        <button className="button primary" onClick={() => openModal(
          { category: `${v[0]}`, sub_category: `${s[0]}` }
        )}>
          Create Product
        </button>
      </div>
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Create Product</h2>
              </li>
              <li>
                {isLoadingSave && <div>isLoading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>

              <li>
                <label htmlFor="title">Name</label>
                <input
                  type="text"
                  name="title"
                  value={title || ''}
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  value={price || ''}
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="url">Image</label>
                <input
                  type="text"
                  name="url"
                  value={url || ''}
                  id="url"
                  onChange={(e) => setUrl(e.target.value)}
                ></input>
                <input type="file" onChange={uploadFileHandler}></input>
                {upisLoading && <div>UpisLoading...</div>}
              </li>
              <li>
                <label htmlFor="size">Size</label>
                <input
                  type="text"
                  name="size"
                  value={size || ''}
                  id="size"
                  onChange={(e) => setSize(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="countInStock">CountInStock</label>
                <input
                  type="text"
                  name="countInStock"
                  value={countInStock || ''}
                  id="countInStock"
                  onChange={(e) => setCountInStock(e.target.value)}
                ></input>
              </li>
              {/* ////////CATEGORY//////////////////// */}
              <li style={{ display: 'flex', marginLeft: '10' }}>
                {/* <div>
                  Category:
                  <select
                    value={category || ''}
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  >
                    {doorsCat.map((x, index) => (
                      <option value={x} key={`${x}_${index}`}>
                        {x}
                      </option>
                    ))}
                  </select>
                </div> */}
                <div style={{ marginLeft: '10' }}>
                  <label htmlFor="category"> Category:</label>
                  <input
                    type="text"
                    readOnly
                    name="category"
                    value={category || ''}
                  ></input>
                </div>
              </li>
              {/* ///////////SUB__CATEGORY///////////////// */}
              <li style={{ display: 'flex', marginLeft: '10' }}>
                {/* <div>
                  Sub-Category:
                  <select
                    value={sub_category || ''}
                    onChange={(e) => {
                      setSubCategory(e.target.value);
                    }}
                  >
                    {sub_categories.map((x, index) => (
                      <option value={x} key={`${x}_${index}`}>
                        {x}
                      </option>
                    ))}
                  </select>
                </div> */}
                <div style={{ marginLeft: '10' }}>
                  <label htmlFor="category">Sub- Category: </label>
                  <input
                    type="text"
                    readOnly
                    name="sub_category"
                    value={sub_category || ''}
                  ></input>
                </div>
              </li>
              {/* ////////////////////////////////// */}
              <li>
                <label htmlFor="description">Description</label>
                <textarea cols="40" rows="3"
                  name="description"
                  value={description}
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </li>
              <li>
                <label htmlFor="complect">Complect</label>
                <textarea cols="40" rows="3"
                  name="complect"
                  value={complect}
                  id="complect"
                  onChange={(e) => setComplect(e.target.value)}
                ></textarea>
              </li>
              <li>
                <button type="submit" className="button primary">
                  {id ? 'Update' : 'Create'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="button secondary"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}
      {
        isLoading ? (
          <LoadingBox></LoadingBox>
        ) : (
              <div className="product-list">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Sub-Category</th>
                      {/* <th>ColorId</th> */}

                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doors.map((product) => (
                      <tr key={product._id}>
                        <td>{<img style={{ height: '60px' }} src={product.url} alt="11" />}</td>
                        <td>{product.title}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.sub_category}</td>
                        {/* <td>{product.color_id}</td> */}
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
    </div>
  );
}
export default MakeDoorScreen;