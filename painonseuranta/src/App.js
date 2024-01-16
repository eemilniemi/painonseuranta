import './App.css';
import React, { useRef, useState } from 'react';





const DatePicker = (props) => {

  const dateInputRef = useRef(null);

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
        ref={dateInputRef}
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
    const newData = [...existingData, newDataPair]
    localStorage.setItem('weightData', JSON.stringify(newData));
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


const App= () => {

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2,'0')
  const day = currentDate.getDate().toString().padStart(2,'0')
  const formattedDate = `${day}-${month}-${year}`

  const [date, setDate] = useState(formattedDate);
  const [weight, setWeight] = useState('')

  return (
    <div className="App">
      <h1>Painonseuranta</h1>
      <h3>Syötä päivämäärä ja paino</h3>

      <DatePicker date={date} setDate={setDate} ></DatePicker>
      <WeightForm weight={weight} setWeight={setWeight} date={date}></WeightForm>
      
    </div>
    
  );
}

export default App;
