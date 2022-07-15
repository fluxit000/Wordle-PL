import { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board';
import Footer from './components/Footer';

function App() {

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
  

  return (
    <div id='contener'>
      <Footer />
      <Board onWordNotFound={onWordNotFound}/>
      {notFound && <div className={'not-found '+(playExitAnimation? "exit": "")}>
        Nie znaleziono takiego słowa w bazie danych
        <div className='timer'></div>
      </div>}
    </div>
  );
}

export default App;
