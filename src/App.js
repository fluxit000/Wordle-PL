import { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board';
import Nav from './components/Nav';
import GameEnd from './components/GameEnd';
import getNewGuess from './guessList'
import Keyboard from './components/keyboard';
import BoardState, {BoardStateConextProvider} from './boardState';

function App() {

  //Word Not Found in DB 
  const [notFound, setNotFound] = useState(false)
  const [playExitAnimation, setPlayExitAnimation] = useState(false)

  useEffect(()=>{
    if(notFound && !playExitAnimation){
      setTimeout(()=>{
        setPlayExitAnimation(true)
        setTimeout(()=>{
          setPlayExitAnimation(false, setNotFound(false))
        },300)
      },5100)
    }
  },[notFound, playExitAnimation])


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
  const [correctWord, setCorrectWord] = useState(getNewGuess());//"CZOŁG"
  const [gameIsReset, setGameIsReset] = useState(0)

  const onNewGuess = ()=>{
    setGameStatus(-1)
    setBoardStatus(null)
    setGameIsReset(state => state+1)
    setCorrectWord(getNewGuess())
  }

  return (
    <div id='contener'>
      {gameStatus !== -1 && <GameEnd onNewGuess={onNewGuess} gameStatus={gameStatus} 
      boardStatus={boardStatus} correctWord={correctWord}/>}

      {notFound && <div className={'not-found '+(playExitAnimation? "exit": "")}>
        Nie znaleziono takiego słowa w bazie danych
        <div className='timer'></div>
      </div>}

      <Nav />
      <BoardStateConextProvider>
        <Board onWordNotFound={setNotFound} onGameEnd={onGameEnd} correctWord={correctWord} gameIsReset={gameIsReset} />
        <Keyboard gameIsReset={gameIsReset}/>
      </BoardStateConextProvider>
      

    </div>
  );
}

export default App;
