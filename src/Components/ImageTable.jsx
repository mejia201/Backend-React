// ImageTable.jsx
import React from 'react';
import '../../src/App.css'

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

function ImageTable({ images }) {

  const maxLength = 170; 


  return (
    <table className="image-table table table-striped table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Fecha</th>
          <th>Nombre</th>
          <th>Imagen</th>
          <th>Descripción</th>
        </tr>
      </thead>
      <tbody>
        {images.map((image, index) => (
          <tr key={index}>

            <td>{index + 1}</td>
            <td>{image.date}</td>
            <td>{image.title}</td>
            <td>
              <img src={image.url} alt={image.title} />
            </td>
            <td>
              {truncateText(image.explanation, maxLength)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ImageTable;
