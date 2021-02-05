import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../redux/actions/userA';
import {useMessage} from '../hooks/message.hook'


function RegisterScreen(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const userRegister = useSelector(state => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  const dispatch = useDispatch();

  //////////Message//////
  const message = useMessage()
  //  const {loading_m, request, error_m, clearError} = useHttp()

  useEffect(() => {
    message(error)
    //  clearError()
  }, [error, message])
  // }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])
  //////////////EndMessage

  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo,     redirect,props.history]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      alert('Password and confirm password are not match');
    } else {
    dispatch(register(name, email, password));
    }
    // мой вариант редиректа
    //  document.location.href = '/';
    if (userInfo) {
      props.history.push('/');
    }
    // props.history.push("/")
  }
  return <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
          <h2>Create Account</h2>
        </li>
        <li>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </li>
        <li>
          <label htmlFor="name">
            Name
          </label>
          <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
          </input>
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
          <label htmlFor="rePassword">Re-Enter Password</label>
          <input type="password" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)}>
          </input>
        </li>
        <li>
          <button type="submit" className="button primary">Register</button>
        </li>
        <li>
          Already have an account?
          <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="button secondary text-center" >Залогиниться</Link>

        </li>

      </ul>
    </form>
  </div>
}
export default RegisterScreen;