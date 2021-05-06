import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import MessageBox from '../components/my/MessageBox'
import LoadingBox from '../components/my/LoadingBox'
import { saveProduct, fetchFilterDoors, deleteProdcut, } from '../redux/actions/doorsA';
import { ColorsFormikMakeDoor } from './ColorsFormikMakeDoor22'

import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DirectionsIcon from '@material-ui/icons/Directions';
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment';
import SaveIcon from '@material-ui/icons/Save';


const useStyles = makeStyles((theme) => ({

  form: {
    margin: theme.spacing(1),

  },
  input: {
    width: '50ch',
    fontSize: 16,
    padding: ' 5px 0px',
    '& .MuiInputBase-root ': {
      fontSize: 16,
    },
    '& .MuiFormLabel-root': {
      fontSize: 16,
      // fontFamily: "Helvetica Arial sans-serif"
    },

  },
  divider: {
    height: 28,
    margin: 4,
  },

  button: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '8px',
    lineHeight: 1.5,
    borderColor: '#eee',
    '&:hover': {
      border: 'none',
      opacity: 'none',
    },

  },
}));



function MakeDoorScreen(props) {
  const classes = useStyles();


  const [modalVisible, setModalVisible] = useState(false);
  const [tableVisible, setTableVisible] = useState(true);

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [url, setUrl] = useState('');
  const [typ, setTyp] = useState('');
  const [size, setSize] = useState('');
  const [category, setCategory] = useState('');
  const [sub_category, setSubCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [complect, setComplect] = useState('');
  const [upisLoading, setUpisLoading] = useState(false);
  const [colors, setColors] = useState([]);
  const [colFinish, setColFinish] = React.useState(colors);
  // colors - цвета из БД рабочие
  // colFinish - новые цвета после редактирования

  // console.log('props.location.search:', props.location.search);
  // props.location.search: ?cat=massiv=sub=classico
  const cat = props.location.search ? String(props.location.search.split("=")[1]) : '';
  const sub = props.location.search ? String(props.location.search.split("=")[3]) : '';
  // console.log('CAT', modalVisible)
  // console.log('sub', sub)

  React.useEffect(() => {
    setColFinish(colors)
  }, [colors]
  )


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
        category: cat,
        sub_category: sub,
        min: 0,
        max: 0,
      }
    ));

  }, [successSave, successDelete]);

  const openModal = (product) => {
    setTableVisible(false)
    setModalVisible(true);
    setId(product._id);
    setTitle(product.title);
    setPrice(product.price);
    setDescription(product.description);
    setComplect(product.complect);
    setUrl(product.url);
    setTyp(product.typ);
    setSize(product.size);
    setCategory(product.category);
    setSubCategory(product.sub_category);
    setCountInStock(product.countInStock);
    setColors(product.colors);
  };
  // console.log('colFinish', colFinish)

  //SAVE////
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        title,
        price,
        url,
        typ,
        size,
        category,
        sub_category,
        countInStock,
        description,
        complect,
        colors: colFinish
      })
    )
    setTableVisible(true)
  };

  const clickBack = () => {
    {
      setModalVisible(false)
      setTableVisible(true)
    }
  }
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



  return (
    <div className="content content-margined">
      <div className="product-header">
        {/* <h3>Products</h3> */}
        {!modalVisible &&
          <button className="button primary" onClick={() => openModal(
            { category: `${cat}`, sub_category: `${sub}` }
          )}>
            Создать продукт
        </button>

        }
      </div>
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {errorSave && <MessageBox variant="danger">{errorSave}</MessageBox>}

      {modalVisible && (

        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                Категория: <b>{category}</b>  Подкатегория: <b>{sub_category} </b>
              </li>
              <li>
                {isLoadingSave && <div>isLoading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>

              <li>

                <TextField
                  label="Название"
                  type="search"
                  defaultValue={title || ''}
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  className={classes.input}
                />
              </li>
              <li>

                <TextField
                  label="Цена"
                  type="number"
                  defaultValue={price}
                  required
                  onChange={(e) => setPrice(e.target.value)}
                  className={classes.input}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Руб.</InputAdornment>,
                  }}
                />
              </li>
              <li>

                <TextField
                  label="Url изображения"
                  type="url"
                  defaultValue={url || ''}
                  required
                  onChange={(e) => setUrl(e.target.value)}
                  className={classes.input}
                />
                {/* <input type="file" onChange={uploadFileHandler}></input>
                {upisLoading && <div>UpisLoading...</div>} */}
              </li>
              <li>

                <TextField
                  label="Тип"
                  type="search"
                  defaultValue={typ || ''}
                  onChange={(e) => setTyp(e.target.value)}
                  className={classes.input}
                />
              </li>
              <li>


                <TextField
                  label="Размеры"
                  type="search"
                  defaultValue={size || ''}
                  onChange={(e) => setSize(e.target.value)}
                  className={classes.input}
                />
              </li>
              <li>

                <TextField
                  label="Количество на складе"
                  type="number"
                  defaultValue={countInStock}
                  // required
                  onChange={(e) => setCountInStock(e.target.value)}
                  className={classes.input}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Шт.</InputAdornment>,
                  }}
                />
              </li>

              <li>

                <TextField
                  label="Описание"
                  defaultValue={description}
                  onChange={(e) => setDescription(e.target.value)}
                  // placeholder="Placeholder"
                  className={classes.input}
                  rows={6}
                  multiline
                  variant="outlined"
                />
              </li>
              <li>

                <TextField
                  label="Характеристики"
                  defaultValue={complect}
                  onChange={(e) => setComplect(e.target.value)}
                  className={classes.input}
                  // rows={6}
                  multiline
                  variant="outlined"
                />
              </li>

              <li>
               
                <Button
                  style={{marginRight:20}}
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                >
                   {id ? 'Обновить' : 'Создать'}
                </Button>

                 <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => clickBack()}
                  className={classes.button}
                >
                  Назад
                </Button>
              </li>
            </ul>
          </form>

          {colFinish &&
            <ColorsFormikMakeDoor
              setColFinish={setColFinish}
              colFinish={colFinish}
            />}

        </div>
      )}

      {/* ///////////////////////////////////////////////////////// */}
      {
        isLoading ? (
          <LoadingBox></LoadingBox>
        ) : tableVisible && (
          <div className="product-list">
            <table className="table">
              <thead>
                <tr>

                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Sub-Category</th>
                  <th>Colors</th>
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
                    <td>
                      {product.colors.length}
                    </td>
                    <td >

                      <IconButton
                        color="primary"
                        className={classes.button}
                        aria-label="directions"
                        onClick={() => openModal(product)}
                      >
                        <DirectionsIcon />
                      </IconButton>

                      <IconButton
                        aria-label="delete"
                        className={classes.button}
                        color="secondary"
                        onClick={() => deleteHandler(product)}
                      >
                        <DeleteIcon fontSize="large" />
                      </IconButton>

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
export default MakeDoorScreen
{/* <li>
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
</li> */}