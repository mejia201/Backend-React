import React, {useEffect, useState} from 'react';
import DivAdd from '../../Components/DivAdd';
import DivTable from '../../Components/DivTable';
import { Link } from 'react-router-dom';
import {confirmation, sendRequest} from '../../functions';

const Departments = () => {

  const [departaments, setDepartaments] = useState([]);
  const [classLoad, setClassLoad] = useState('');
  const [classTable, setClassTable] = useState('d-none');

  useEffect( () =>{

    getDeparments();

  });

  const getDeparments = async() =>{
    const res = await sendRequest('GET', '', '/api/departments','');
    setDepartaments(res);
    setClassTable('');
    setClassLoad('d-none');
  }

  const deleteDepartment = (id, name) =>{
    confirmation(name, '/api/departments/'+id, 'departments');
  }


  return (
    <div className='container-fluid mt-5'>
      <DivAdd>

        <Link to='/create' className='btn btn-primary'>
          
          <i className='fa-solid fa-circle-plus'></i> Agregar nuevo departamento

        </Link>
      </DivAdd>

      <DivTable col='6' off='3' classLoad={classLoad} classTable={classTable}>
          <table className='table table-bordered table-striped mt-3 '>
            <thead>
              <tr>
                <th>Departamento</th>
                <th>Descripcion</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className='table-group-divider'>

              {departaments.map( (row, i)=>(
               <tr key={row.id}>
                 <td>{row.name}</td>
                 <td>{row.description}</td>
                 <td>

                 <div class="btn-group" role="group">

                  <Link to={'/edit/'+row.id} className='btn btn-warning'>
                     <i className='fa-solid fa-edit'></i>
                  </Link>

                  <button className='btn btn-danger'
                  onClick={() => deleteDepartment(row.id, row.name)}>
                    <i className='fa-solid fa-trash'></i>
                  </button>
                  
                 </div>

                  

                 </td>
               </tr>

              ))}

            </tbody>

          </table>
      </DivTable>

    </div>
  )
}

export default Departments