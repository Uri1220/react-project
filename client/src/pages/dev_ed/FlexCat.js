import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import LoadingBox from '../../components/my/LoadingBox';
import MessageBox from '../../components/my/MessageBox';
import { createCat, listCats } from '../../redux/actions/categoryA';
import '../../scss/flex.scss'







function DevRdReactToDo() {
  const [category_new, setCategoryNew] = useState('');

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createCat(category_new));
  }
  const catRegister = useSelector(state => state.catCreate);
  const { loading, catMessage, error } = catRegister;


  return (
    <>
      <div>
        <div class="raz" id="raz9">
          <div>11</div>
          <div>2222</div>
          <div>33333333</div>
        </div>

        {/* <div class="raz" id="raz10">
          <div></div>
          <div></div>
        </div> */}
      </div>
      {/* //////////////////////////// */}
      <div className="form">
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
    </>
  )
}
export default DevRdReactToDo
