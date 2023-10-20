import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import storage from '../Storage/storage';
import { sendRequest } from '../functions';  

const Dashboard = () => {

  const [departmentCount, setDepartmentCount] = useState(null);
  const [employeeCount, setEmployeeCount] = useState(null);
  const [proyectCount, setProyectCount] = useState(null);


  //cargando departamentos
  useEffect(() => {
    fetchDepartmentCount();
  }, []);

  const fetchDepartmentCount = async () => {
    try {
      const response = await sendRequest('GET', null, '/api/getdepartmentcount');
      if (response && response.departments) {
        setDepartmentCount(response.departments);
      } else {
        console.error('Failed to fetch department count');
      }
    } catch (error) {
      console.error('Error fetching department count:', error);
    }
  };

//cargando empleados
  useEffect(() => {
    fetchEmployeeCount();
  }, []);


  const fetchEmployeeCount = async () => {
    try {
      const response = await sendRequest('GET', null, '/api/getemployeecount'); 
      if (response && response.employees) {
        setEmployeeCount(response.employees);
      } else {
        console.error('Failed to fetch employee count');
      }
    } catch (error) {
      console.error('Error fetching employee count:', error);
    }
  };


  //cargando proyectos

  useEffect(() => {
    fetchProyectCount();
  }, []);

  const fetchProyectCount = async () => {
    try {
      const response = await sendRequest('GET', null, '/api/getproyectcount'); 
      if (response && response.proyects) {
        setProyectCount(response.proyects);
      } else {
        console.error('Failed to fetch proyect count');
      }
    } catch (error) {
      console.error('Error fetching proyect count:', error);
    }
  };



  
  return (
    <div className='text-center mt-5'>
      
      <h2 className='fw-bold'>Bienvenido, {storage.get('authUser').name}</h2>
      <p className='fw-normal'>Resumen de los datos cargados desde la API</p>

      <div class="row ms-2 me-2 mt-5">

            <div class="col-md-4">
                <div class="card text-white bg-success mb-3">
                    <div class="card-header">
                    
                    <i class="fa-solid fa-building-circle-check "></i>  Departamentos

                    </div>
                    <div class="card-body text-center">
                        <h5 class="card-title display-5">
                        {departmentCount}
                        </h5> 
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card text-white bg-danger mb-3">
                    <div class="card-header">
                        <i class="fa-solid fa-user-tie "></i>  Empleados
                    </div>
                    <div class="card-body text-center">
                        <h5 class="card-title display-5">
                          {employeeCount}
                        </h5> 
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card text-white bg-primary mb-3">
                    <div class="card-header">
                        
                    <i class="fa-solid fa-folder-open"></i>  Proyectos

                    </div>
                    <div class="card-body text-center">
                        <h5 class="card-title display-5">
                            {proyectCount}
                        </h5> 
                    </div>
                </div>
            </div>

        </div>

      
      </div>
  )
}

export default Dashboard