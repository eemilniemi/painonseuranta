import './App.css';
import {useState} from 'react';
import LineChart from './components/LineChart';
import stringifyDate from './components/FormatDate'


const replaceData = (date,weight,setWeightData) => {
    const existingDataString = localStorage.getItem('weightData')
    const existingData = existingDataString ? JSON.parse(existingDataString) : [];

    const indexToUpdate = existingData.findIndex(item => item.date === date);
    if(indexToUpdate !== -1){
      existingData.splice(indexToUpdate,1)
    }
    if(weight === ''){
      localStorage.setItem('weightData', JSON.stringify(existingData));

      setWeightData({
        labels: existingData.map((data) => data.date),
        datasets: [{
          label:"Paino",
          data: existingData.map((data)=> data.weight),
        }]
      })
      return;
    }
    const newDataPair = {date: date, weight: weight}
    const newData = [...existingData, newDataPair];

    newData.sort((a, b) => { 
      const dateA = new Date(a.date.split('-').reverse().join('-'));
      const dateB = new Date(b.date.split('-').reverse().join('-'));
    
      return dateA - dateB;
    });
   
    localStorage.setItem('weightData', JSON.stringify(newData));

    setWeightData({
      labels: newData.map((data) => data.date),
      datasets: [{
        label:"Paino",
        data: newData.map((data)=> data.weight),
      }]
    })
}

const DatePicker = (props) => {
  const handleChange = (e) => {
    if(e.target.value !== ''){
      const stringDate = stringifyDate(new Date(e.target.value));
      props.setDate(stringDate);
    }
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
    replaceData(props.date, props.weight, props.setWeightData);
  }
  return(
    <div>
      <form onSubmit={handleSubmit}>
      Paino: <input value = {props.weight} onChange = {(e) => props.setWeight(e.target.value)}/> kg
      <br/><br/>
      <button type="submit">Lähetä</button>
      </form>
    </div>
    
  )
}

const ClearButton = (props) => {
  const handleClear = (event) =>{
    event.preventDefault();
    if(window.confirm("Haluatko varmasti poistaa kaikki painotiedot?")){
      localStorage.setItem('weightData', []);
      props.setWeightData([]);
    }
  }
  return(
    <div>
      <button onClick ={handleClear}>Poista kaikki tiedot</button>
    </div>
  )
}

const AllData = ({data, setWeightData}) => {
  
    if(data.length === 0){
      return;
    }
    const dates = data.labels
    const weights = data.datasets[0].data
  
    const handleButtonClick = (date) => {
      replaceData(date,'',setWeightData)
    }

  return(
    <>
    {dates.map((date, index) => (
      <div key={date}>
        <button  onClick={() => handleButtonClick((date))}>
          {`Poista tieto päivämäärältä ${(date)}, Paino: ${weights[index]} kg`}
        </button>
        <br/>
    </div>
      ))}
    </>
  )
}

const App= () => {
  const dateString = stringifyDate(new Date())

  const dataString = localStorage.getItem('weightData')
  const data = dataString ? JSON.parse(dataString) : [];

  const [date, setDate] = useState(dateString);
  const [weight, setWeight] = useState('')

  const [weightData, setWeightData] = useState({
    labels: data.map((data) => ((data.date))),
    datasets: [{
      label:"Paino",
      data: data.map((data)=> data.weight),
    }]
  })


  return (
    <div className="App">
        <h1>Painonseuranta</h1>
        <h3>Syötä päivämäärä ja paino</h3>
        
        <DatePicker date={date} setDate={setDate}/>
        <WeightForm weight={weight} setWeight={setWeight} setWeightData = {setWeightData} date={date}/>
        <LineChart chartData={weightData}/>
        <br/>
        <AllData data={weightData} setWeightData={setWeightData}/>
        <br/>
        <ClearButton setWeightData = {setWeightData}/>
    </div>
  );
}

export default App;
