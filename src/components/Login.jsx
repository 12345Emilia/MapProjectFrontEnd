import { useRef, useState } from 'react';
import { Room, Cancel } from '@material-ui/icons';
import './login.css';
import axios from 'axios';

export default function Login({ setShowLogin, myStorage, setCurrentUser }) {
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post('/users/login', user);
      myStorage.setItem('user', res.data.username);
      setCurrentUser(res.data.username);
      setShowLogin(false);
      setError(false);
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className='loginContainer'>
      <div className='loginlogo'>
        <Room />
        EJA Travel Pin
      </div>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='username' ref={nameRef}></input>
        <input type='password' placeholder='password' ref={passwordRef}></input>
        <button className='loginBtn'>Login</button>
        {error && (
          <span className='failure'>
            Wrong username and/or password, please try again!
          </span>
        )}
      </form>
      <Cancel className='loginCancel' onClick={() => setShowLogin(false)} />
    </div>
  );
}
