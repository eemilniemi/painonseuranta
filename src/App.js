import './App.css';
import {useState} from 'react';
import { Line } from "react-chartjs-2";
import LineChart from './components/LineChart';


const DatePicker = (props) => {


  const handleChange = (e) => {
   
    const year = new Date(e.target.value).getFullYear();
    const month = (new Date(e.target.value).getMonth() + 1).toString().padStart(2,'0')
    const day = new Date(e.target.value).getDate().toString().padStart(2,'0')
    const formattedDate = `${day}-${month}-${year}`

    props.setDate(formattedDate);
    console.log(formattedDate)
  };
  return(
      <div>
        <input
        type="date"
        onChange={handleChange}
      />
      <p>Valittu päivämäärä: {props.date}</p>
      </div>
  )
}

const WeightForm = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const newDataPair = {date: props.date, weight: props.weight}
    const existingDataString = localStorage.getItem('weightData')
    const existingData = existingDataString ? JSON.parse(existingDataString) : [];
    const indexToUpdate = existingData.findIndex(item => item.date === props.date);
    console.log(indexToUpdate, existingData[indexToUpdate])
    if(indexToUpdate !== -1){
      existingData.splice(indexToUpdate,1)
    }
    const newData = [...existingData, newDataPair];
    


    newData.sort((a, b) => {
      const dateA = new Date(a.date.split('-').reverse().join('-'));
      const dateB = new Date(b.date.split('-').reverse().join('-'));
    
      return dateA - dateB;
    });
   
    localStorage.setItem('weightData', JSON.stringify(newData));

    const dataString = localStorage.getItem('weightData')
    const data = dataString ? JSON.parse(dataString) : [];



    props.setWeightData({
      labels: data.map((data) => data.date),
      datasets: [{
        label:"Paino",
        data: data.map((data)=> data.weight),
      }]
    })
    

  }
  return(
    <>
    <form onSubmit={handleSubmit}>
    Paino: <input value = {props.weight} onChange = {(e) => props.setWeight(e.target.value)}/> kg
    <br/><br/>
    <button type="submit">Lähetä</button>
    </form>
    </>
  )
}

const parseDate = (dateString) => {
  const [day, month, year] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};



const App= () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2,'0')
  const day = currentDate.getDate().toString().padStart(2,'0')
  const formattedDate = `${day}-${month}-${year}`

  const dataString = localStorage.getItem('weightData')
  const data = dataString ? JSON.parse(dataString) : [];

  
  const [date, setDate] = useState(formattedDate);
  const [weight, setWeight] = useState('')

  const [weightData, setWeightData] = useState({
    labels: data.map((data) => (parseDate(data.date))),
    datasets: [{
      label:"Paino",
      data: data.map((data)=> data.weight),
    }]
  })


  console.log(weightData)

  return (

    <div className="App">


        <h1>Painonseuranta</h1>
        <h3>Syötä päivämäärä ja paino</h3>

        <DatePicker date={date} setDate={setDate} ></DatePicker>
        <WeightForm weight={weight} setWeight={setWeight} setWeightData={setWeightData} date={date}></WeightForm>
        <div className="App" style={{width: 1600, height: 100}}>
          <LineChart chartData={weightData}></LineChart>
        </div>

        <div>
        </div>

    </div>

    
  );
}

export default App;
