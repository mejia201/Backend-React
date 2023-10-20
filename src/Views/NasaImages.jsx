import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ImageTable from '../Components/ImageTable';
import 'bootstrap/dist/css/bootstrap.min.css';

function NasaImage() {
    const [images, setImages] = useState([]);
    const [count, setCount] = useState(20);  
  
    useEffect(() => {
        const apiUrl = `/api/nasa-api?count=${count}`;

  
      axios
        .get(apiUrl)
        .then((response) => {
          // Almacena los datos de la respuesta en el estado
          setImages(response.data);
        })
        .catch((error) => {
          console.error('Error al obtener datos de la NASA:', error);
        });
    }, [count]);


    const handleSelectChange = (event) => {
      const selectedCount = parseInt(event.target.value, 10);
      setCount(selectedCount);
    };
  
    return (
      <div className="container">
        <h1 className="text-center text-success mt-5 mb-2">Imágenes de la NASA</h1>
        <p className='text-center mb-5'>Listado de imagenes con sucesos importantes de uno de los sitios web más populares de la NASA, la Astronomy Picture of the Day.</p>
        <div className='text-center mb-4'>
        <label className='fw-bold' htmlFor="countSelect">Selecciona el número de registros para mostrar:</label>
        <select className='ms-1'  id="countSelect" value={count} onChange={handleSelectChange}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
        </select>
      </div>

        <ImageTable images={images} /> {/* Utilizo el componente ImageTable */}
      </div>
    );
  }
  
  export default NasaImage;
  