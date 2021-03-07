import './App.css';
import React, {useState} from 'react'
import DatePickers from './date.js'
import { Button } from '@material-ui/core';
import styled from 'styled-components'
import LinearProgress from '@material-ui/core/LinearProgress';

function App() {
  const [pic, setPic] = useState(null)
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [explanation, setExplanation] = useState('')


  async function getPic(){
    setPic(null)
    setLoading(true)
    let url = 'https://api.nasa.gov/planetary/apod?'
    url += 'date=' + date
    url += '&api_key=QAXu9IAzUdi0kHAfGgqJittdWJSHUP2MvjZuiTiT'
    console.log(url)
    const r = await fetch(url)
    const j = await r.json()
    console.log(j)
    if (j.url){
      setPic(j.url)
      if (j.title) {setTitle(j.title)}
      if (j.explanation) {setExplanation(j.explanation)}
    } else{
      setPic('')
    }
    setLoading(false)
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

      {loading && <LinearProgress />}

      <div className="result">
        <p>
        {!loading && pic && title!=='' && <Text1>{title}</Text1>}
        {!loading && pic && explanation!=='' && <Text2>{explanation}</Text2>}
        </p>

        {!loading && pic!=null && !pic.includes('youtube') && 
        <img className="media" src={pic} alt=""></img>}

        {!loading && pic!=null && pic.includes('youtube') && <div class="videoWrapper"><iframe width="420" height="315" frameborder="0" 
        title="APOD video" src={pic} allow="fullscreen; accelerometer; autoplay; encrypted-media; gyroscope;"></iframe></div>}

  
      </div>

      {!loading && pic==='' && <Empty>
        Media not found  ☹️  
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
const Text1 = styled.p`
  width:90%;
  color:white;
  text-align:left;
  font-weight:bold;
  font-size:1rem;
`

const Text2 = styled.p`
  width:90%;
  color:#d9d9d9;
  text-align:left;
  margin-bottom:10px;
  font-size:0.8rem;
  
`


export default App;
