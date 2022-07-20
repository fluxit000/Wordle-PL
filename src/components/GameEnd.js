import { useEffect, useState } from 'react'
import './gameEnd.css'

const GameEnd = ({gameStatus, boardStatus, onNewGuess, correctWord})=>{
    const [isShow, setIsShow] = useState(true)
    const [startExitAnimation, setStartExitAnimation] = useState(false)
    const [guessCount, setGuessCount] = useState(0)
    const [guessGraph, setGuessGraph] = useState([])

    const onClickBackground = (e)=>{
        if(e.target.className === "background"){
            setStartExitAnimation(true,setTimeout(()=>{setIsShow(false)},600))
        }
    }

    useEffect((()=>{
        let guessCount = boardStatus.findIndex(item=> item[0] === "")
        setGuessCount(guessCount)
        let guessGraph = []

        guessCount = guessCount > 0? guessCount: 6

        for(let i = 0; i < guessCount; i++){
            let temp = {correct: 0, medium: 0, incorrect: 0};
            boardStatus[i].map((item)=>{
                temp[item]++
            })
            guessGraph.push(temp)
        }

        setGuessGraph(guessGraph)
    }),[])

    const onNextWord = ()=>{
        setStartExitAnimation(true,setTimeout(()=>{
            setIsShow(false)
            setGuessCount(0)
            setGuessGraph([])
            onNewGuess()
        },600))
        
    }

    return <>{isShow && <div className='background' onClick={onClickBackground}>
        <div className={"game-end "+(startExitAnimation? "game-end-exit": "")}>
            <div className='title'>You {gameStatus === 2? "lose": "win"}</div>
            <div className='details'>
                {gameStatus === 1? "You guess in "+guessCount: "Corrent word was "+correctWord}
                <div className='graph'>
                    {guessGraph.map((item,i)=>
                        <div className='line-row' key={i}>
                            <span className='label'>{i+1}:</span>
                            <div className='line correct' style={{width: (item.correct*50/5)+"%"}}></div>
                            <div className='line medium' style={{width: (item.medium*50/5)+"%"}}></div>
                            <div className='line incorrect' style={{width: (item.incorrect*50/5)+"%"}}></div>
                        </div>
                    )}
                </div>
            </div>
            <div className='buttons'>
                <button onClick={onNextWord} className="next">Next word</button>
            </div>
        </div>
    </div>}</>
}

export default GameEnd