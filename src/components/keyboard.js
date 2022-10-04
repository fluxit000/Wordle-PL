import { useContext, useEffect, useState } from 'react'
import BoardStateConext from '../store/boardState'
import './keyboard.css'

const Keyboard = ({gameIsReset})=>{
    const letterBoard = [["Ą","Ć","Ę","Ł","Ó","Ś","Ń","Ż","Ź"],["Q","W","E","R","T","Y","U","I","O","P"]
                    ,["A","S","D","F","G","H","J","K","L"],["Z","X","C","V","B","N","M"]
                    ]
    const [letterBoardStatus, setLetterBoardStatus] = useState([
        [null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null]
    ])

    const {board, boardStatus, stateChange, onKeyboardPress} = useContext(BoardStateConext)

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
                            let temp = [...letterBoardStatus]
                            temp[c][index] = boardStatus[i][k]+"-guess"
                            setLetterBoardStatus(temp)
                        }
                    })
                }
            }
        }
    },[stateChange])

    useEffect(()=>{
        setLetterBoardStatus([
            [null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null]
        ])
    },[gameIsReset])

    return <div id='keyboard'>{letterBoardStatus.map((line, i)=>{
        return (
        <div className='keyboard-line' key={letterBoard[i][0]+"A"}>
            {line.map((status, k)=>{
                return <div key={letterBoard[i][k]} onClick={()=>{onKeyboardPress(letterBoard[i][k])}} 
                className={'keyboard-letter '+(status === null? "": status)}>
                    {letterBoard[i][k]}
                </div>
            })}
        </div>
        )
    }
    )}</div>
}

export default Keyboard