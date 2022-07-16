import { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board';
import Footer from './components/Footer';
import GameEnd from './components/GameEnd';
import getNewGuess from './guessList'


function App() {

  //Word Not Found in DB 
  const [notFound, setNotFound] = useState(false)
  const [playExitAnimation, setPlayExitAnimation] = useState(false)

  const onWordNotFound = ()=>{
    setNotFound(true)
    setTimeout(()=>{
      setPlayExitAnimation(true)
      setTimeout(()=>{
        setNotFound(false)
        setPlayExitAnimation(false)
      },300)
    },5100)
  }


  //game end
  const [gameStatus, setGameStatus] = useState(-1)
  const [boardStatus, setBoardStatus] = useState()
  const onGameEnd = (gameStatus, boardStatus)=>{
    if(gameStatus !== -1){
      setBoardStatus(boardStatus)
      setGameStatus(gameStatus)
    }
  }

  //generate new word
  const [correctWord, setCorrectWord] = useState(getNewGuess());
  const [gameIsReset, setGameIsReset] = useState(false)

  const onNewGuess = ()=>{
    setGameStatus(-1)
    setBoardStatus(null)
    setGameIsReset(true, setTimeout(()=>{
      setGameIsReset(false)
    },100))
    setCorrectWord(getNewGuess())
  }

  return (
    <div id='contener'>
      <Footer />
      <Board onWordNotFound={onWordNotFound} onGameEnd={onGameEnd} correctWord={correctWord} gameIsReset={gameIsReset}/>
      {notFound && <div className={'not-found '+(playExitAnimation? "exit": "")}>
        Nie znaleziono takiego słowa w bazie danych
        <div className='timer'></div>
      </div>}
      {gameStatus !== -1 && <GameEnd onNewGuess={onNewGuess} gameStatus={gameStatus} boardStatus={boardStatus}/>}

    </div>
  );
}

export default App;
