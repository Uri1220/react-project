import React, { useEffect, useState, useCallback } from 'react';
// import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../redux/actions/userA';
import { useMessage } from '../hooks/message.hook'
import MessageBox from '../components/my/MessageBox';


function SigninScreen(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;

  const dispatch = useDispatch();
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

  // в куках есть userInfo поэтому страница не отображся идет редирект
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
      //  props.history.push("/");
    }
    return () => {
      //
    };
  }, [userInfo]);

  //////////Message//////

  // const [error, setError] = useState(null)
  // const clearError = useCallback(() => setError(null), [])


  const message = useMessage()

  useEffect(() => {
    message(error)
    //  clearError()
  }, [error, message])
  // }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])
  //////////////EndMessage

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log('fgffggf')
    dispatch(signin(email, password));

  }
  return <div className="form">
    {error && <MessageBox variant="danger">{error}</MessageBox>}

    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
          <h2>Sign-In</h2>
        </li>
        <li>
          {loading && <div>Loading...</div>}
        </li>
        <li>
          <label htmlFor="email">
            Email
          </label>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
          </input>
        </li>
        <li>
          <button type="submit" className="button primary">Signin</button>
        </li>
        {/* <li>
          New to amazona?
        </li>
        <li>
          <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="button secondary text-center" >Create your amazona account</Link>
        </li> */}
      </ul>
    </form>
  </div>
}
export default SigninScreen;