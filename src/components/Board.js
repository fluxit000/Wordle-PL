import { useState, useEffect, useContext } from "react";
import wordExist from "../wordDataBase";
import "./board.css";
import BoardStateConext from "../boardState";

const specialChar = ["ą", "ś", "ć", "ó", "ż", "ź", "ń", "ę", "ł"];


const Board = ({onWordNotFound, onGameEnd, correctWord, gameIsReset}) => {
  const {board, setBoard, boardStatus, setBoardStatus, withKeyPress} = useContext(BoardStateConext)


  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const [currentGuess, setCurrentGuess] = useState(0);

  const [altIsActive, setaltIsActive] = useState(false);

  const [rotateCell, setRotateCell] = useState(-1);

  const [gameStatus, setGameStatus] = useState(-1)//1-win game 2-lose game

  const onBadGuess = (row) => {//on press ENTER / on incorrect guess
    setRotateCell(row,
      setTimeout(() => {
        let temp = boardStatus;
        board[row].map((item, i)=>{
          if(item.toUpperCase() === correctWord[i]){
            temp[row][i] = "correct"
          }
          else if(correctWord.split("").includes(item.toUpperCase())){
            temp[row][i] = "medium"
          }
          else{
            temp[row][i] = "incorrect"
          }
        });
        setBoardStatus(temp);

        setRotateCell(-1);
        setCurrentGuess((guess)=>guess+1)
        setCurrentRowIndex(0)
      }, 400)
    );
  };

  const addChar = (key) => {//add press char to board
    let temp = board;
    temp[currentGuess][currentRowIndex] = key;
    setCurrentRowIndex((index) => index + 1, setBoard(temp));
  };

  useEffect(()=>{//when keybord component press key
    if(withKeyPress !== "" && currentRowIndex < 5){
      addChar(withKeyPress)
    }
  },[withKeyPress])

  useEffect(() => {//on eny key press 
    const onKeyPress = (e) => {
      if(gameStatus !== -1){
        return -1
      }
      if (e.key === "AltGraph") {
        setaltIsActive(true);
      } 

      else if (e.keyCode >= 65 && e.keyCode <= 90 && currentRowIndex < 5) {//onKeyPress (check if character is letter)
        if (altIsActive && !specialChar.includes(e.key.toLocaleLowerCase())) {
          return -1
        }
        else{
          addChar(e.key);
        }
      } 
      else if (e.key === "Enter") {//on enter key
        if (currentRowIndex === 5) {
          if (wordExist(board[currentGuess].join("").toUpperCase())) {
            if (board[currentGuess].join("").toUpperCase() === correctWord) {//word is corrent
              setGameStatus(1)
            } 
            else {//word is not corrent
              onBadGuess(currentGuess);
            }
          }
          else {//not found this word in DB
            onWordNotFound(true)
          }
        }
      } 
      else if (e.key === "Backspace" && currentRowIndex > 0) {//on Backspace key
        let temp = board;
        temp[currentGuess][currentRowIndex - 1] = "";
        setCurrentRowIndex((index) => index - 1, setBoard(temp));
      }
    };

    const onKeyRelease = (e) => {//on alt key is release
      if (e.key === "AltGraph") {
        setaltIsActive(false);
      }
    };

    window.addEventListener("keydown", onKeyPress);
    window.addEventListener("keyup", onKeyRelease);

    return () => window.removeEventListener("keydown", onKeyPress);
  }, [board, currentRowIndex, altIsActive, gameStatus]);


  //Game event

  useEffect(()=>{//on game end
    setTimeout(()=>{
      onGameEnd(gameStatus, boardStatus)
    },600)
  },[gameStatus])

  useEffect(()=>{//on game lose
    if(currentGuess == 6){
      setGameStatus(2)
    }
  },[currentGuess])

  useEffect(()=>{//on game win
    if(gameStatus === 1){
      setRotateCell(currentGuess,
        setTimeout(() => {
          let temp = boardStatus;
          temp[currentGuess].fill("correct")
          setBoardStatus(temp);
          setRotateCell(-1)
        }, 400)
      );
    }
  },[gameStatus, boardStatus, currentGuess])

  useEffect(()=>{//on game restart 
    if(gameIsReset){
      setBoard([
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""]
      ])
      setBoardStatus([
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""]
      ])
      setCurrentRowIndex(0)
      setCurrentGuess(0)
      setGameStatus(-1)
    }
  },[gameIsReset])

  return (
    <div id="board">
      {board.map((row, i) => (
        <div className="row" key={i}>
          {row.map((item, k) => (
            <div
              key={k}
              className={
                "cell " +
                (rotateCell === i ? "rotate-guess" : "") +
                (boardStatus[i][k] != "" ? boardStatus[i][k]+"-guess" : "")
              }
            >
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;