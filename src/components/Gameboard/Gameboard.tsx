import { useRef, useState } from "react";
import { Timer } from "./Timer/Timer";
import { IntervalOption, IntervalSelectContainer, Score, WordsContainer } from "./Gameboard.styles";
import  JSConfetti from "js-confetti";

interface GameboardProps {
    challangeWords: string[]
}

export const Gameboard = ({challangeWords}: GameboardProps) => {
    const [input, setInput] = useState("");
    const [seconds, setSeconds] = useState(60);
    const [score, setScore] = useState(0);
    const [highscore, setHighscore] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [countdownStarted, toggleCountdown] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [randomWord, setRandomWord] = useState("--start-game--");
    const [startLock, setStartLock] = useState(false);

    const jsConfetti = new JSConfetti();


    const newWord = () => {
        let newWord;

            do {
                newWord = challangeWords[Math.floor(Math.random() * challangeWords.length)];
            } while (newWord === randomWord);
            setRandomWord(newWord);
            setScore((score) => score + 1);
            setInput("");
    }

    const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
       
        if(e.key === "Enter") {
            if(value !== randomWord || countdownStarted === false){
                return;
            }
            newWord();
        }
        
        if(e.key === " "){
            e.preventDefault();
            if(!countdownStarted){
                handleStart();
            }
            else{
                if(value !== randomWord){
                    return;
                }
                newWord();
            }
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
        toggleCountdown(false);
    }
    
    const handleStart = () => {
        if(countdownStarted || startLock){
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
        toggleCountdown(true);
    }

    const handleTimerEnd = (startSeconds: number) => {
        toggleCountdown(false);
        const minutes = startSeconds / 60;
        const newWpm = Math.floor(score/minutes);
        if(newWpm > wpm){
            setHighscore(newWpm)
            jsConfetti.addConfetti();
        }
        setWpm(newWpm);

        setStartLock(true);

        setTimeout(() => {
            setStartLock(false);
        }, 1500);
    }

    return (
        <>
        <Score>Highscore: {highscore} wpm</Score>
        <Score>Words/Minute {wpm}</Score>
        <IntervalSelectContainer>
            <IntervalOption selected={seconds === 30} onClick={() => setSeconds(30)} variant="outlined">30 sek</IntervalOption> 
            <IntervalOption selected={seconds === 60} onClick={() => setSeconds(60)} variant="outlined">1 min</IntervalOption> 
            <IntervalOption selected={seconds === 120} onClick={() => setSeconds(120)} variant="outlined">2 min</IntervalOption> 
        </IntervalSelectContainer>  
        <Timer key={seconds} countdownStarted={countdownStarted} startSeconds={seconds} onEnd={() => handleTimerEnd(seconds)}/>
        <WordsContainer>
            {randomWord.split("").map((letter, index) => {
                const typed = input[index];
                
                let color = "white";
                
                if(typed != undefined){
                    color = typed === letter ? "#5ed881" : "red";
                }
                return(
                    <span key={index} style={{color}}>
                        {letter}
                    </span>
                );
            })}
            {input.length > randomWord.length &&
                input.slice(randomWord.length).split("").map((letter, index) =>(
                    <span key={`overflow-${index}`} style={{color: "red"}}>
                        {letter}
                    </span>
                ))  
            }
        </WordsContainer>
        <input ref={inputRef} value={input.trimStart()} onChange={(e) => setInput(e.target.value)} style={{width: "250px", height: "30px", borderRadius: "5px"}} onKeyDown={handleKeyDown} placeholder="press Space..."></input>
        {/* <p> Score: {score}</p>   */}
        <div style={{margin: "10px"}} >
            <button style={{margin: "5px"}} onClick={handleStart}>Start</button>
            <button style={{margin: "5px"}} onClick={handleReset}>Reset</button>
        </div>
        </>
    );
}