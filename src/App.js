import { useState } from 'react';
import './App.css';
import Github from './icons/github';

function App() {
  const [board, setBoard] = useState([["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""]])

  return (
    <div id='contener'>
      <div id='footer'><a target="_blank" href="https://github.com/fluxit000/Wordle-PL"><Github color="var(--dark-font)" size={35}/></a><span id="title">Wordle PL</span></div>
      <div id="board">
        {/* <div className='row'><div className='cell'></div><div className='cell'></div><div className='cell'></div><div className='cell'></div><div className='cell'></div></div>
        <div className='row'><div className='cell'></div><div className='cell'></div><div className='cell'></div><div className='cell'></div><div className='cell'></div></div>
        <div className='row'><div className='cell'></div><div className='cell'></div><div className='cell'></div><div className='cell'></div><div className='cell'></div></div>
        <div className='row'><div className='cell'></div><div className='cell'></div><div className='cell'></div><div className='cell'></div><div className='cell'></div></div>
        <div className='row'><div className='cell'></div><div className='cell'></div><div className='cell'></div><div className='cell'></div><div className='cell'></div></div>
        <div className='row'><div className='cell'></div><div className='cell'></div><div className='cell'></div><div className='cell'></div><div className='cell'></div></div> */}

        {/* {board.map(row =>
        <div className='row'>
          {row.map((item)=><div className='cell'>{item}</div>)}
        <div/>
        )} */}
        
        {board.map(row=><div className='row'>{row.map(item=><div className='cell'>{item}</div>)}</div>)}
      </div>
    </div>
  );
}

export default App;
