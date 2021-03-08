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

  function getPreviousDate(){
    var currentday = date
    console.log(currentday)
    currentday = new Date( currentday.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") );
    console.log(currentday)
    currentday.setDate(currentday.getDate()-1)
    currentday = currentday.toISOString().split('T')[0]
    console.log(currentday)
    setDate(currentday)

    getPic(currentday)
  }

  function getNextDate(){
    var currentday = date
    console.log(currentday)
    currentday = new Date( currentday.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") );
    console.log(currentday)
    currentday.setDate(currentday.getDate()+1)
    currentday = currentday.toISOString().split('T')[0]
    console.log(currentday)
    setDate(currentday)

    getPic(currentday)
  }

  function getDate(){
    var currentday = date
    console.log(currentday)
    currentday = new Date( currentday.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") );
    console.log(currentday)
    currentday = currentday.toISOString().split('T')[0]
    console.log(currentday)
    setDate(currentday)

    getPic(currentday)
  }


  async function getPic(currentday){
    setPic(null)
    setLoading(true)
    let url = 'https://api.nasa.gov/planetary/apod?'
    url += 'date=' + currentday
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
    
      <div class="dropdown">
        <span className="info">ⓘ</span>
        <div class="dropdown-content">
          <p>Search for NASA's fabulous Astronomy pictures/videos from any day. Search result also comes
            with a description for those who are interested in learning about space!<br/>Built with React and NASA APOD API.<br/>
            Pao Pongsala (2021)
          </p>
        </div>
      </div>



        <div className="head-text"><strong>Astronomy Picture of the Day</strong></div>
      </header>
      <div className="form">
        <DatePickers date={date} setDate={setDate} />
        <Button className="search" variant="contained" color="primary" onClick={getDate}>Search</Button>
      </div>

      {loading && <LinearProgress />}

      <div className="result">
        <p className="texts">
        {!loading && pic && title!=='' && <Text1>{title}</Text1>}
        {!loading && pic && explanation!=='' && <Text2>{explanation}</Text2>}
        </p>

        {!loading && pic!=null && !pic.includes('youtube') && !pic.includes('vimeo') &&
        <img className="media" src={pic} alt=""></img>}

        {!loading && pic!=null && (pic.includes('youtube')||pic.includes('vimeo')) && <div class="videoWrapper"><iframe width="420" height="315" frameborder="0" 
        title="APOD video" src={pic} allow="fullscreen; accelerometer; autoplay; encrypted-media; gyroscope;"></iframe></div>}

  
      </div>

      {!loading && pic==='' && <Empty>
        Media not found  ☹️  
      </Empty>}

      {pic!=null && <button className="move" id="before" onClick={getPreviousDate}>
            ←
            </button>}

      {pic !=null && <button className="move" id="after" onClick={getNextDate}>
            →
            </button>}

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
