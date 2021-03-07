import './App.css';
import React, {useState} from 'react'
import DatePickers from './date.js'
import { Button } from '@material-ui/core';

function App() {
  const [pic, setPic] = useState(null)
  const [date, setDate] = useState('')
  

  async function getPic(){
    setPic(null)
    let url = 'https://api.nasa.gov/planetary/apod?'
    url += 'date=' + date
    url += '&api_key=QAXu9IAzUdi0kHAfGgqJittdWJSHUP2MvjZuiTiT'
    console.log(url)
    const r = await fetch(url)
    const j = await r.json()
    console.log(j)
    setPic(j.url)
  }

  return (
  <div className="App">
      <header className="App-header">
        <div className="head-text">Astronomy Picture of the Day</div>
      </header>
      <div className="form">
        <DatePickers date={date} setDate={setDate} />
        <Button variant="contained" color="primary" onClick={getPic}>Search</Button>
      </div>
      <div className="result">
        <img className="media" src={pic} alt=""></img>
      </div>

  </div>
  );
}


export default App;
