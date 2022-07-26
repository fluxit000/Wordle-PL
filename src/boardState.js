import {createContext, useState, } from 'react'

const BoardStateConext = createContext({
    setBoard: board => {},
    board: [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
    ],
    boardStatus: [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
    ],
    setBoardStatus: boardStatus => {},
    stateChange: false
})


export const BoardStateConextProvider = props=>{
    const [board, setBoardState] = useState([
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
    ])
    const [boardStatus, setBoardStatusState] = useState([
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
    ])
    const [stateChange, setStateChange] = useState(1)

    const setBoard = (state, callAfter)=>{
        setBoardState(state)
        
    }

    const setBoardStatus = (state, callAfter)=>{
        setBoardStatusState(state, setStateChange((state)=>state+1))
    }


    return <BoardStateConext.Provider value={{board, setBoard, boardStatus, setBoardStatus, stateChange}}>
        {props.children}
      </BoardStateConext.Provider>
} 


export default BoardStateConext