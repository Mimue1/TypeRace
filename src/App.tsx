import { useState } from 'react'
import './App.css'
import { FileUpload } from './components/FileUpload/FileUpload'
import { Gameboard} from './components/Gameboard/Gameboard'

function App() {

  const [challangeWords, setChallengeWords] = useState([        
        "apple", "book", "car", "dog", "elephant",
        "flower", "garden", "house", "ice", "jacket",
        "key", "lamp", "mountain", "notebook", "orange",
        "pencil", "queen", "river", "sun", "tree",
        "umbrella", "violin", "window", "yellow", "zebra"
      ]);

  return (
    <>
      <div>
        <h1>TypeRace</h1>
        <Gameboard challangeWords={challangeWords}/>
      </div>
      <FileUpload setChallengeWords={setChallengeWords}/> 
    </>
  )
}

export default App

