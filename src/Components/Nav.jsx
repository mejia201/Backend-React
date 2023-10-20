import { Link, useNavigate } from "react-router-dom";
import storage from '../Storage/storage';

const Nav = () => {

  const go = useNavigate();
  
  const logout = async() =>{
    storage.remove('authToken');
    storage.remove('authUser');
    
    await axios.get('/api/auth/logout', storage.get('authToken'));
    go('/login');

  }
  return (

    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#e3e5fd' }}>
    <div className="container-fluid">

      <Link className="navbar-brand" to="/">Parcial - React</Link>
      
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
      </button>
    </div>

    {storage.get('authUser') ? (
      <div className="collapse navbar-collapse" id="nav">
        
        <ul className="navbar-nav col-lg-6 text-center" style={{ display: "flex", justifyContent: "center" }}>       
        <li className="nav-item">
          <Link className="nav-link active fw-medium" to="/departments">Departamentos</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active fw-medium" to="/employees">Empleados</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active fw-medium" to="/proyects">Proyectos</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active fw-medium" to="/graphic">Grafica</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active fw-medium" to="/graphicProyects">Resumen</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link active fw-medium" to="/nasa-images">Nasa</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link active fw-medium" to="/asteroids">Asteroides</Link>
        </li>
        </ul>

        <ul className="navbar-nav mx-auto mb-2 mt-2">

        <li className="nav-item px-lg-5">
         <button className="btn btn-danger" onClick={logout}>Logout</button>
        </li>
        </ul>
      </div>
     ) : '' } 

  </nav>

  )
}

export default Nav