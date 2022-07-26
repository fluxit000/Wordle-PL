import {createContext, useEffect, useState, } from 'react'

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
    stateChange: false,
    onKeyboardPress: key => {},
    withKeyPress: ''
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


    const [withKeyPress, onKeyboardPress] = useState('')

    useEffect(()=>{
        setTimeout(()=>{onKeyboardPress('')},10)
    },[withKeyPress])
    

    return <BoardStateConext.Provider 
            value={{board, setBoard, boardStatus, setBoardStatus, stateChange,
            onKeyboardPress, withKeyPress}}>
        {props.children}
      </BoardStateConext.Provider>
} 


export default BoardStateConext