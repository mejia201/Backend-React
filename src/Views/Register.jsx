import React, {useState} from 'react'
import { useNavigate} from 'react-router-dom';
import {sendRequest} from '../functions';
import DivInput from '../Components/DivInput';
import { Link } from 'react-router-dom';
const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const go = useNavigate();

  const csrf = async() =>{

    await axios.get('/sanctum/csrf-cookie');

  }

  const register = async(e) =>{
    e.preventDefault();
    await csrf();

    const form ={name:name, email:email, password:password};
    const res = await sendRequest('POST', form, '/api/auth/register', '', false);
    if(res.status == true){

      go('/login');

    }
  }


  return (
    <div className='container-fluid mt-5'>
    <div className='row mt-5'>
     <div className='col-md-4 offset-md-4'>

      <div className='card border border-dark'>

        <div className='card-header bg-dark border border-dark
        text-white'>
          REGISTRO
        </div>
        <div className='card-body'>

          <form onSubmit={register}>

            <DivInput type='text' icon='fa-user' value={name}
            className='form-control' placeholder='Nombre' required='required'
            handleChange={ (e) => setName(e.target.value)} />

            <DivInput type='email' icon='fa-at' value={email}
            className='form-control' placeholder='Email' required='required'
            handleChange={ (e) => setEmail(e.target.value)} />

            <DivInput type='password' icon='fa-key' value={password}
            className='form-control' placeholder='Password' required='required'
            handleChange={ (e) => setPassword(e.target.value)} />
           
           <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className='btn btn-primary mt-2'>
              <i className='fa-solid fa-circle-user me-2'></i>
              Registrarse
            </button>
            <Link to='/login' className='btn btn-secondary mt-2'>
          
          <i className='fa-solid fa-xmark-circle me-2'></i> Regresar

          </Link>

           </div>

          </form>

          <div className='mt-3 text-center'>



          </div>

          

        </div>
      </div>

     </div>

    </div>
  </div>
  )
}

export default Register