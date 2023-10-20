import  {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './Components/Nav';
import Dashboard from './Views/Dashboard';
import Departments from './Views/Departments/Index';
import CreateDepartments from './Views/Departments/Create';
import EditDepartments from './Views/Departments/Edit';
import Employees from './Views/Employees/Index';
import Graphic from './Views/Employees/Graphic';
import Proyects from './Views/Proyects/Index';
import GraphicProyects from './Views/Proyects/GraphicProyects'
import Login from './Views/Login';
import Register from './Views/Register';
import NasaImages from './Views/NasaImages'
import NasaApiFormDates from './Views/NasaApiFormDates';
import ProtectedRoutes from './Components/ProtectedRoutes';

function App() {

  return (

    <BrowserRouter>

      <Nav />
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoutes />}>

            <Route path="/" element={<Dashboard />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/create" element={<CreateDepartments />} />
            <Route path="/edit/:id" element={<EditDepartments />} />

            <Route path="/employees" element={<Employees />} />

            <Route path="/proyects" element={<Proyects />} />

            <Route path="/graphic" element={<Graphic />} />

            <Route path="/graphicProyects" element={<GraphicProyects />}/>

            <Route path="/nasa-images" element={<NasaImages />}/>

            <Route path="/asteroids" element={<NasaApiFormDates />}/>

          

          </Route>

          

        </Routes>
    
    </BrowserRouter>
 
  )
}

export default App
