import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
function NasaApiFormDate() {

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [asteroids, setAsteroids] = useState([]);


  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  
  const handleSearch = () => {
    // Formatea las fechas al formato requerido por la API (YYYY-MM-DD)
    const formattedStartDate = startDate ? formatDate(startDate) : '';
    const formattedEndDate = endDate ? formatDate(endDate) : '';
  
    if (!formattedStartDate || !formattedEndDate) {
      console.error('Por favor, selecciona ambas fechas.');
      return;
    }
  

    const apiUrl = `/api/nasa-neo-api?start_date=${formattedStartDate}&end_date=${formattedEndDate}`;
    
  
    axios
      .get(apiUrl)
      .then((response) => {
        setAsteroids(response.data.near_earth_objects[formattedEndDate] || []);
      })
      .catch((error) => {
        console.error('Error al obtener datos de asteroides:', error);
      });
  };
  
  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };
  



  return (
    <div className='container-fluid'>
      <h1 className='mt-5 mb-2 ms-4'>Selección de Fechas</h1>
      <p className='fw-semibold mb-3 ms-4' >Objetivo: Recuperar una lista de asteroides en función de su fecha de máxima aproximación a la Tierra</p>
      <small className='text-danger ms-4 mt-1'>Sugerencia: La fecha de fin para mayor precision debe ser 7 dias despues de la fecha inicio como maximo.</small>
      <div className='row text-center'>

      <div className='col-md-6 mt-4'>
        <label htmlFor="startDate">Fecha de inicio:</label>
        <input
          className='ms-3'
          type="date"
          id="startDate"
          value={startDate}
          onChange={handleStartDateChange}
        />
      </div>
      <div className='col-md-6 mt-4'>
        <label htmlFor="endDate">Fecha de fin:</label>
        <input
          className='ms-3'
          type="date"
          id="endDate"
          value={endDate}
          onChange={handleEndDateChange}
        />
      </div>

      </div>

      <div class="d-grid gap-2 col-6 mx-auto mt-4 mb-5">

      <button className='btn btn-primary' onClick={handleSearch}>Buscar Asteroides</button>

      </div>
      
      
      {asteroids.length > 0 && (
        <table className='table table-striped table-hover table-bordered mb-5'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Fecha de Acercamiento</th>
              <th>Velocidad (km/h)</th>
              <th>Distancia Mínima (km)</th>
              <th>Diámetro Mínimo (km)</th>
              <th>Diámetro Máximo (km)</th>
              <th>¿Potencialmente Peligroso?</th>
              <th>Cuerpo Orbitante</th>
            </tr>
          </thead>
          <tbody>
            {asteroids.map((asteroid) => (
              <tr key={asteroid.id}>
                <td>{asteroid.id}</td>
                <td>{asteroid.name}</td>

                <td>{asteroid.close_approach_data[0].close_approach_date_full}</td>
                <td>{asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour}</td>
                <td>{asteroid.close_approach_data[0].miss_distance.kilometers}</td>
                <td>{asteroid.estimated_diameter.kilometers.estimated_diameter_min}</td>
                <td>{asteroid.estimated_diameter.kilometers.estimated_diameter_max}</td>
                <td>{asteroid.is_potentially_hazardous_asteroid ? 'Sí' : 'No'}</td>
                <td>{asteroid.close_approach_data[0].orbiting_body}</td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default NasaApiFormDate;
