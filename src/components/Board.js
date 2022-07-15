import { useState, useEffect } from "react";
import wordExist from "../wordDataBase";
import "./board.css";

const specialChar = ["ą", "ś", "ć", "ó", "ż", "ź", "ń", "ę", "ł"];
const correctWord = "CZOŁG";

const Board = ({onWordNotFound}) => {
  const [board, setBoard] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  const [boardStatus, setBoardStatus] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const [currentGuess, setCurrentGuess] = useState(0);

  const [altIsActive, setaltIsActive] = useState(false);

  const [rotateCell, setRotateCell] = useState(-1);

  const [gameStatus, setGameStatus] = useState(-1)//1-correct word 2-incorrect word

  const onBadGuess = (row) => {
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
        setTimeout(() => {
          setRotateCell(-1);
          setCurrentGuess((guess)=>guess+1)
          setCurrentRowIndex(0)
        }, 200);
      }, 200)
    );
  };

  useEffect(() => {
    const onKeyPress = (e) => {
      if(gameStatus === -1){
        if (e.key === "AltGraph") {
          setaltIsActive(true);
        } 
        else if (e.keyCode >= 65 && e.keyCode <= 90 && currentRowIndex < 5) {//onKeyPress
          const addChar = () => {
            let temp = board;
            temp[currentGuess][currentRowIndex] = e.key;
            setCurrentRowIndex((index) => index + 1, setBoard(temp));
          };
          if (altIsActive) {
            if (specialChar.includes(e.key.toLocaleLowerCase())) {
              addChar();
            }
          } 
          else {
            addChar();
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
              onWordNotFound()
            }
          }
        } 
        else if (e.key === "Backspace" && currentRowIndex > 0) {//on Backspace key
          let temp = board;
          temp[currentGuess][currentRowIndex - 1] = "";
          setCurrentRowIndex((index) => index - 1, setBoard(temp));
        }
      }
    };

    const onKeyRelease = (e) => {
      if (e.key === "AltGraph") {
        setaltIsActive(false);
      }
    };

    window.addEventListener("keydown", onKeyPress);
    window.addEventListener("keyup", onKeyRelease);

    return () => window.removeEventListener("keydown", onKeyPress);
  }, [board, currentRowIndex, altIsActive, gameStatus]);
  

  useEffect(()=>{
    if(currentGuess == 6){
      setGameStatus(2)
    }
  },[currentGuess])

  useEffect(()=>{
    if(gameStatus === 1){
      setRotateCell(currentGuess,
        setTimeout(() => {
          let temp = boardStatus;
          temp[currentGuess].fill("correct")
          setBoardStatus(temp);
          setTimeout(() => {setRotateCell(-1);}, 200);
        }, 200)
      );
    }
  },[gameStatus, boardStatus, currentGuess])

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
