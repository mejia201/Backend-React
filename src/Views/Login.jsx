import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import {sendRequest} from '../functions';
import DivInput from '../Components/DivInput';
import storage from '../Storage/storage';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const go = useNavigate();

  const csrf = async() =>{

    await axios.get('/sanctum/csrf-cookie');

  }

  const login = async(e) =>{
    e.preventDefault();
    await csrf();

    const form ={email:email, password:password};
    const res = await sendRequest('POST', form, '/api/auth/login', '', false);
    if(res.status == true){
      storage.set('authToken', res.token);
      storage.set('authUser', res.data);
      go('/')
    }
  }

  return (
    <div className='container-fluid mt-5'>
      <div className='row mt-5'>
       <div className='col-md-4 offset-md-4'>

        <div className='card border border-dark'>

          <div className='card-header bg-dark border-dark 
          text-white'>
            LOGIN
          </div>
          <div className='card-body'>

            <form onSubmit={login}>

              <DivInput type='email' icon='fa-at' value={email}
              className='form-control' placeholder='Email' required='required'
              handleChange={ (e) => setEmail(e.target.value)} />

              <DivInput type='password' icon='fa-key' value={password}
              className='form-control' placeholder='Password' required='required'
              handleChange={ (e) => setPassword(e.target.value)} />
             
             <div className='d-grid col-10 mx-auto'>
              <button className='btn btn-dark'>
                Iniciar sesion
                <i className='fa-solid fa-right-from-bracket ms-2'></i>
                
              </button>
             </div>

            </form>

            <div className='mt-3 text-center'>

            <Link to='/register'>
            Registrarme <i className='fa-solid fa-user-plus'></i> 
            </Link>

            </div>

            

          </div>
        </div>

       </div>

      </div>
    </div>
  )
}

export default Login