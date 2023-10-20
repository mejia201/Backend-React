import {useEffect, useState} from 'react'
import {sendRequest} from '../../functions'
import { Pie, Bar, getDatasetAtEvent } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement,Tooltip,
Legend,CategoryScale, LinearScale, BarElement } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, 
  LinearScale, BarElement);


const GraphicProyects = () => {

  const [info, setInfo] = useState([]);
  const [colors, setColors] = useState([]);
  let charOptions = {responsive:true};

  useEffect(()=>{

    getData();

  }, [])

  const random = () =>{
    return Math.floor(Math.random() * 256);
  }

  const getData = async() =>{
    const res = await sendRequest('GET', '', '/api/proyectsbyemployee', '');
    setInfo(res);
    res.map(() => (
      colors.push("rgb("+random()+","+random()+","+random()+")")

    ));

  }


  const charData = {
    labels: info.map(d => d.name),
    datasets:[{label: 'Proyectos', data:info.map(d => d.count),
    backgroundColor: colors}]
  }

  return (
    <div className='container-fluid mb-4'>
      <h3 className='text-center mt-5 fw-semibold'>Cantidad de proyectos por empleado</h3>
      <div className='row mt-4'> 
      <div className='col-md-6 offset-md-3'>
        <Pie options={charOptions} data={charData}/>
      </div>
      </div>
    </div>
  )
}

export default GraphicProyects
