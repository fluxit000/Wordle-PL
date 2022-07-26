import { useContext, useEffect, useState } from 'react'
import BoardStateConext from '../boardState'
import './keybord.css'

const Keybord = ()=>{
    const letterBoard = [["Ą","Ć","Ę","Ł","Ó","Ś","Ń","Ż","Ź"],["Q","W","E","R","T","Y","U","I","O","P"]
                    ,["A","S","D","F","G","H","J","K","L"],["Z","X","C","V","B","N","M"]
                    ]
    const [letterBoardStatus, setLetterBoardStatus] = useState([
        [null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null]
    ])

    const {board, boardStatus, stateChange, onKeyboardPress} = useContext(BoardStateConext)

    const [uzlessCounter, setUzlessCounter] = useState(0)

    useEffect(()=>{
        if(boardStatus === undefined){
            return -1
        }
        for (let i = 0; i < boardStatus.length; i++) {
            for(let k = 0; k < boardStatus[i].length; k++){
                if(boardStatus[i][k] === "correct" || boardStatus[i][k] === "medium"){
                    letterBoard.forEach((letters, c)=>{
                        let index = letters.findIndex((letter)=>{return letter == board[i][k].toUpperCase()})
                        if(index >= 0 && letterBoardStatus[c][index] !== "correct-guess"){
                            let temp = letterBoardStatus
                            temp[c][index] = boardStatus[i][k]+"-guess"
                            setLetterBoardStatus(temp, setUzlessCounter((state)=>state+1))
                        }
                    })
                }
            }
        }
    },[stateChange])


    return <div id='keybord'>{letterBoard.map((line, i)=>{
        return (
        <div className='keybord-line' key={line[i][0]+"A"}>
            {line.map((letter, k)=>{
                return <div key={letter} onClick={()=>{onKeyboardPress(letter)}} className={'keybord-letter '+letterBoardStatus[i][k]}>{letter}</div>
            })}
        </div>
        )
    }
    )}</div>
}

export default Keybord