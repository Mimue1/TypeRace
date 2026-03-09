import { useEffect, useState } from "react";
import { Time, TimeWrapper } from "./Timer.styles";

interface TimerProps{
    countdownStarted: boolean,
    startSeconds: number,
    onEnd?: () => void
}

export const Timer = ({countdownStarted, startSeconds, onEnd}:TimerProps) => {

    const [seconds, setSeconds] = useState(startSeconds);

    const formatTime = (sec: number) => {
        const minutes = Math.floor(sec / 60);
        const remainingSeconds = sec % 60;
        return `${minutes.toString().padStart(2,"0")}:${remainingSeconds.toString().padStart(2,"0")}`;
    }
    
    useEffect(() => {
        if(!countdownStarted){
            return;
        }
        setSeconds(startSeconds);
        let timer = setInterval(() => {
            setSeconds((seconds) => {
                if(seconds === 0){
                    clearInterval(timer);
                    return 0;
                }
                else return seconds - 1
            });
        }, 1000);

        return () => {
            clearInterval(timer);
            setSeconds(startSeconds);
        };
    }, [countdownStarted, startSeconds]);

    useEffect(() => {
        if(seconds === 0 && countdownStarted){
            if(onEnd){
                onEnd();
            }
        }
    }, [seconds, countdownStarted, onEnd])

    return (
        <TimeWrapper started={countdownStarted}>
            <Time>{formatTime(seconds)}</Time>
        </TimeWrapper>

    )
}