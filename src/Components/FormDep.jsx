import React, {useEffect, useState,useRef} from "react";
import {sendRequest} from '../functions';
import DivInput from './DivInput';
import { Link } from 'react-router-dom';




const FormDep = (params) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const NameInput = useRef();
    let method = 'POST';
    let url = '/api/departments';
    let redirect = '/departments';

    useEffect( () => {
        NameInput.current.focus();
        getDepartments();

    }, []);

    const getDepartments = async() =>{
        if(params.id !== null){
            const res = await sendRequest('GET', '', (url+'/'+params.id));
            setName(res.data.name);
            setDescription(res.data.description);
        }
    }

    const save =async(e) =>{
        e.preventDefault();
        if(params.id !== null){
            method = 'PUT'
            url = '/api/departments/'+params.id;
            redirect = '/departments'
        }

        const res = await sendRequest(method, {name:name, description:description},url,redirect );
        if(method == 'POST' && res.status == true){

            setName('');
            setDescription('');

        }
    }


  return (
    <div className="container-fluid">
        <div className="row mt-5">
            <div className="col-md-4 offset-md-4">
                <div className="card border border-primary">
                    <div className="card-header bg-primary border border-primary text-white">
                        {params.title}
                    </div>
                    <div className="card-body">

                        <form onSubmit={save}>

                            <DivInput type='text' icon='fa-building' 
                            value={name} className='form-control'
                            placeholder='Nombre' required='required'
                            ref={NameInput}
                            handleChange={(e) => setName(e.target.value)}/>

                            <DivInput type='text' icon='fa-tags' 
                            value={description} className='form-control'
                            placeholder='Descripcion'
                            ref={NameInput}
                            handleChange={(e) => setDescription(e.target.value)}/>

                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button className="btn btn-success mt-2">
                                    <i className="fa-solid fa-save me-2"></i>
                                  Guardar
                                </button>

                                <Link to='/departments' className='btn btn-secondary mt-2'>
          
                                <i className='fa-solid fa-xmark-circle me-2'></i> Regresar

                                </Link>

                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormDep
