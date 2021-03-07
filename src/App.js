import './App.css';
import React, {useState} from 'react'
import DatePickers from './date.js'
import { Button } from '@material-ui/core';
import styled from 'styled-components'

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
    if (j.url){
      setPic(j.url)
    }
  }

  console.log(pic)

  return (
  <div className="App">
      <header className="App-header">
        <div className="head-text"><strong>Astronomy Picture of the Day</strong></div>
      </header>
      <div className="form">
        <DatePickers date={date} setDate={setDate} />
        <Button variant="contained" color="primary" onClick={getPic}>Search</Button>
      </div>
      <div className="result">
        <img className="media" src={pic} alt=""></img>
      </div>

      {pic===null && <Empty>
        Media not found ☹️  
      </Empty>}


  </div>
  );
}

const Empty = styled.p`
  width:100%;
  font-size:1.2rem;
  color:white;
  text-align:center;
`

export default App;
