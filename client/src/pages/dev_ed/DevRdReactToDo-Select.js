import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import LoadingBox from '../../components/my/LoadingBox';
import MessageBox from '../../components/my/MessageBox';
import { createCat, listCats } from '../../redux/actions/categoryA';






function DevRdReactToDo() {
  const [category_new, setCategoryNew] = useState('');

  const dispatch = useDispatch();
  // const catslist = useSelector((state) => state.orderList);
  // const { loading_cat, cats, error_cat } = catslist;

  // React.useEffect(() => {
  //   dispatch(listCats())
  // }, [])



  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createCat(category_new));
  }



  const catRegister = useSelector(state => state.catCreate);
  const { loading, catMessage, error } = catRegister;
  


  return <div className="form">
    <form onSubmit={submitHandler}>
      <ul className="form-container">
        <li>
          <h2>Create Category</h2>
        </li>
        <li>
          {loading && <div>Loading...</div>}
          {error && <div style={{ background: 'red', display: 'inline' }}>{error}</div>}
          {catMessage && <div style={{ background: 'green', display: 'inline' }}>{catMessage.message}</div>}
        </li>
        <li>
          <label htmlFor="name"> New Category:</label>
          <input
            type="text"
            name="category_new"
            value={category_new}
            id="category_new"
            onChange={(e) => setCategoryNew(e.target.value)}
          ></input>
        </li>
        <li>
          <button type="submit" className="button primary">Register</button>
        </li>


      </ul>
    </form>
  </div>
}
export default DevRdReactToDo
