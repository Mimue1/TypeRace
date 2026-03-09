import { useRef, useState } from "react";
import { Timer } from "./Timer/Timer";
import { Button, Typography } from "@mui/material";
import { IntervalOption, IntervalSelectContainer, Score, WordsContainer } from "./Gameboard.styles";

interface GameboardProps {
    challangeWords: string[]
}

export const Gameboard = ({challangeWords}: GameboardProps) => {
    const [input, setInput] = useState("");
    const [seconds, setSeconds] = useState(60);
    const [score, setScore] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [countdownStarted, setCountdownStarted] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [randomWord, setRandomWord] = useState("--start-game--");


    const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        
        if(e.key === "Enter") {
            if(value !== randomWord || countdownStarted === false){
                return;
            }
            let newWord;

            do {
                newWord = challangeWords[Math.floor(Math.random() * challangeWords.length)];
            } while (newWord === randomWord);
            setRandomWord(newWord);
            setScore((score) => score + 1);
            setInput("");
        }
    }

    const handleReset = () => {
        let newWord
        do {
            newWord = challangeWords[Math.floor(Math.random() * challangeWords.length)];
        } while (newWord === randomWord);
        setRandomWord("--start-game--");
        setScore(0);
        setInput("");
        setCountdownStarted(false);
    }
    
    const handleStart = () => {
        if(countdownStarted){
            return;
        }
        let newWord;
        do{
            newWord = challangeWords[Math.floor(Math.random() * challangeWords.length)];
        }while(newWord == randomWord);
        inputRef.current?.focus();
        setRandomWord(newWord);
        setScore(0);
        setInput("");
        setCountdownStarted(true);
    }

    const handleTimerEnd = (startSeconds: number) => {
        setCountdownStarted(false);
        const minutes = startSeconds / 60;
        setWpm(Math.floor(score / minutes));
    }

    return (
        <>
        <Score>Words/Minute {wpm}</Score>
        <IntervalSelectContainer>
            <IntervalOption selected={seconds === 30} onClick={() => setSeconds(30)} variant="outlined">30 sek</IntervalOption> 
            <IntervalOption selected={seconds === 60} onClick={() => setSeconds(60)} variant="outlined">1 min</IntervalOption> 
            <IntervalOption selected={seconds === 120} onClick={() => setSeconds(120)} variant="outlined">2 min</IntervalOption> 
        </IntervalSelectContainer>  
        <Timer key={seconds} countdownStarted={countdownStarted} startSeconds={seconds} onEnd={() => handleTimerEnd(seconds)}/>
        <WordsContainer>
            {randomWord.split("").map((letter, index) => {
                const isCorrect = input[index] == letter;
                return(
                    <span key={index} style={{color: isCorrect ? "#5ed881" : "white"}}>
                        {letter}
                    </span>
                )
            })}
        </WordsContainer>
        <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} style={{width: "250px", height: "30px", borderRadius: "5px"}} onKeyDown={handleKeyDown}></input>
        <p> Score: {score}</p>  
        <div >
            <button style={{margin: "5px"}} onClick={handleStart}>Start</button>
            <button style={{margin: "5px"}} onClick={handleReset}>Reset</button>
        </div>
        </>
    );
}