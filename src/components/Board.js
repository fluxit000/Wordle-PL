import { useState, useEffect } from 'react';

const specialChar = ['ą','ś','ć','ó','ż','ź','ń','ę','ł']

const Board = ()=>{
    const [board, setBoard] = useState([["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""]])
    const [currentRowIndex, setCurrentRowIndex] = useState(0)
    const [currentGuess, setCurrentGuess] = useState(0)
    const [altIsActive, setaltIsActive] = useState(false)

  
    useEffect(()=>{
      const onKeyPress = e =>{
        if(e.key === "AltGraph"){
            setaltIsActive(true)
        }
        else if(e.keyCode >= 65 && e.keyCode < 90 && currentRowIndex < 5){
            const addChar = ()=>{
                let temp = board
                temp[currentGuess][currentRowIndex] = e.key
                setCurrentRowIndex(index=> index+1, setBoard(temp))
            }
            if(altIsActive){
                if(specialChar.includes(e.key.toLocaleLowerCase())){
                    addChar()
                }
            }
            else{
                addChar()
            }
          
        }
        else if(e.key === "Enter"){
          if(currentRowIndex === 5){
            console.log(board[currentGuess].join(""))
          }
        }
        else if(e.key === "Backspace" && currentRowIndex > 0){
          let temp = board
          temp[currentGuess][currentRowIndex-1] = ""
          setCurrentRowIndex(index=> index-1, setBoard(temp))
        }
      }

      const onKeyRelease = e =>{
        if(e.key === "AltGraph"){
            setaltIsActive(false)
        }
      }
  
      window.addEventListener('keydown', onKeyPress)
      window.addEventListener('keyup', onKeyRelease)
  
      return ()=> window.removeEventListener('keydown', onKeyPress)
  },[board, currentRowIndex, altIsActive])

    return (
        <div id="board">
            {board.map((row,i)=>
            <div className='row' key={i}>
              {row.map((item,k)=><div key={k} className='cell'>{item}</div>)}
            </div>)}
        </div>
    );
}

export default Board