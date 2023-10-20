import React, {useEffect, useState, useRef} from 'react'
import DivAdd from '../../Components/DivAdd'
import DivTable from '../../Components/DivTable'
import DivSelect from '../../Components/DivSelect'
import DivInput from '../../Components/DivInput'
import Modal from '../../Components/Modal'
import { confirmation, sendRequest } from '../../functions'
import { PaginationControl } from 'react-bootstrap-pagination-control'


const Proyects = () => {


  const [proyects, setProyects] = useState([]);
  const [id,  setId] =useState('');
  const [name,  setName] =useState('');
  const [duration,  setDuration] =useState('');
  const [description,  setDescription] =useState('');
  const [status,  setStatus] =useState('');
  const [operation,  setOperation] =useState('');

  const statusOptions = [
    { value: 'En progreso', label: 'En progreso' },
    { value: 'Completado', label: 'Completado' },
    { value: 'Pendiente', label: 'Pendiente' },
  ];

  const [title,  setTitle] =useState('');

  const [employeeId,  setEmployeeId] =useState('');
  const [employees,  setEmployees] =useState([]);

  const [classLoad,  setClassLoad] =useState('');
  const [classTable,  setClassTable] =useState('d-none');
  const [rows,  setRows] =useState(0);
  const [page,  setPage] =useState(1);
  const [pageSize,  setPageSize] =useState(0);

  const NameInput = useRef();
  const close = useRef();

  let method = '';
  let url = '';


  useEffect(()=>{
    getProyects(1);
    getEmployees()
  }, []);


  const getProyects = async(page) =>{

    const res = await sendRequest('GET','', '/api/proyects?page='+page,'');
    setProyects(res.data);
    setRows(res.total);
    setPageSize(res.per_page);
    setClassTable('')
    setClassLoad('d-none');

  }


  const getEmployees = async() =>{

    const res = await sendRequest('GET', '', '/api/employeesall', '');
    setEmployees(res);
  }


  const deleteProyect = (id, name) =>{
    confirmation(name, '/api/proyects/'+id,'proyects');

  }

  const clear=() =>{
    setName('');
    setDuration('');
    setDescription('');
    setStatus('');
    setEmployeeId(1);

  }


  const openModal =(op, n, dur, d, st, em, pro) =>{
    clear();
    setTimeout( ()=> NameInput.current.focus(), 600);
    setOperation(op);
    setId(pro);
    if(op == 1){
      setTitle('Agregar proyecto');
    }else{
      setTitle('Actualizar proyecto');
      setName(n);
      setDuration(dur);
      setDescription(d);
      setStatus(st);
      setEmployeeId(em);
    }

  }


  const save = async(e) =>{
    e.preventDefault();
    if(operation ==1){
      method = 'POST';
      url = '/api/proyects'
    }else{
      method = 'PUT';
      url = '/api/proyects/'+id;
    }

    const form = {name:name, duration:duration, description:description, status:status, employee_id:employeeId};
    const res = await sendRequest(method, form, url, '');

    if(method == 'PUT' && res.status == true){
       close.current.click();
    }
    if(res.status == true){
      clear();
      getProyects(page)
      setTimeout( ()=> NameInput.current.focus(), 3000);
    }


  }

  const goPage = (p) =>{
    setPage(p);
    getProyects(p);
  }

 
  return (
    <div className='container-fluid mt-5'>
       <DivAdd>
        <button className='btn btn-primary' data-bs-toggle='modal' 
        data-bs-target='#modalProyects' onClick={()=>openModal(1)}>
        <i className='fa-solid fa-circle-plus me-2'></i>Agregar Proyecto
        </button> 
      </DivAdd>

      <DivTable col='10' off='1' classLoad={classLoad} classTable={classTable}>
          <table className='table table-bordered table-striped mt-3 '>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Duracion (Semanas)</th>
                <th>Descripcion</th>
                <th>Status</th>
                <th>Empleado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className='table-group-divider'>

              {proyects.map( (row, i)=>(
               <tr key={row.id}>
                 <td>{row.name}</td>
                 <td className='text-center'>{row.duration}</td>
                 <td>{row.description}</td>
                 <td>{row.status}</td>
                 <td>{row.employee}</td>

                 <td>

                 <div class="btn-group" role="group">

                 <button className='btn btn-warning' data-bs-toggle='modal' 
                data-bs-target='#modalProyects' onClick={()=>openModal(2, row.name, row.duration, row.description, row.status, row.employee_id, row.id)}>
                <i className='fa-solid fa-edit'></i>
                 </button> 

                  <button className='btn btn-danger'
                  onClick={() => deleteProyect(row.id, row.name)}>
                    <i className='fa-solid fa-trash'></i>
                  </button>
                  
                 </div>

                  

                 </td>
               </tr>

              ))}

            </tbody>

          </table>
          <PaginationControl changePage={page=> goPage(page)}
          next={true} limit={pageSize} page={page} total={rows}/>
      </DivTable>


      <Modal title={title} modal='modalProyects'>

        <div className='modal-body'>
          <form onSubmit={save}>

          <DivInput type='text' icon='fa-briefcase' 
            value={name} className='form-control'
            placeholder='Nombre del proyecto' required='required'
            ref={NameInput}
            handleChange={(e) => setName(e.target.value)}/>


          <DivInput type='number' icon='fa-clock' 
            value={duration} className='form-control'
            placeholder='Duración en semanas' required='required'
            handleChange={(e) => setDuration(e.target.value)}/>


          <DivInput type='text' icon='fa-list-check' 
            value={description} className='form-control'
            placeholder='Descripción' required='required'
            handleChange={(e) => setDescription(e.target.value)}/>


      <div className="input-group mb-3">
        <span className="input-group-text">
          <i className={`fa-solid fa-calendar-days`}></i>
        </span>
        <select
          name="status"
          value={status}
          className="form-select"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="" disabled selected>
          Selecciona una opción
          </option>
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

          <DivSelect icon='fa-user-tie' required='required'
            value={employeeId} className='form-select' options={employees}
            handleChange={(e) => setEmployeeId(e.target.value)}/>
          
          <div className="d-grid col-10 mx-auto">
              <button className="btn btn-success">
                <i className="fa-solid fa-save me-2"></i>
                Guardar
                </button>
            </div>
          </form>
        </div>

        <div className='modal-footer'>
          <button className='btn btn-dark' data-bs-dismiss='modal'
          ref={close}>Cerrar</button>
        </div>

    </Modal>

    </div>
  
  )
}

export default Proyects