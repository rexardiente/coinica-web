import { NetworkWifi, NoteAddTwoTone } from '@material-ui/icons';
import {useEffect, useState} from 'react';
import { convertToObject } from 'typescript';

interface Timer{
    hours: number;
    minutes: number;
    seconds: number
}

const Timer = () => {
    const [error, setError] = useState<any>(null);
    const [timer, setTimer] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        startTimer();
    },[]);

    const startTimer = () => {
        var time = setInterval(countDown, 1000);
    }

    const countDown = () => {
      try {
        var timerValue: Timer = calculateTimer();

        setTimer({
          hours: timerValue.hours,
          minutes: timerValue.minutes,
          seconds: timerValue.seconds,
        });
      } catch (error) {
        setError(error);
      }
    }

    const calculateTimer = () => {
        var varTimer:Timer = {
            hours: 0,
            minutes: 0,
            seconds: 0,
        }
        var now = new Date();
        var offset = (now.getTimezoneOffset() / 60) * -1; // get timezone offset in hours. PH is -8 hours. Reverse to get +8

        var midnightUTC = new Date();
        midnightUTC.setDate(midnightUTC.getDate() + 1); //24 hours
        midnightUTC.setHours(0, 0, 0, 0);
        midnightUTC.setTime(midnightUTC.getTime() + (offset * 60 * 60 * 1000)); //set the timezone equivalent of UTC 12:00. ex: 12:00 UTC is 8:00am PH.

        // console.log('now : ', NoteAddTwoTone);
        // console.log('midnightUTC : ' , midnightUTC);

        //check if difference is more than 24 hours. ex: now is Dec 10 11:00PM , timer is Dec 11 8:00AM. when now turns to Dec 11 00:00AM, timer still needs to be at Dec 11 8:00AM.
        var difference = Math.abs(midnightUTC.getTime() - now.getTime()); 

        var calculateHourDifference = difference / 1000; //milliseconds
        const hourDifference = Math.floor(calculateHourDifference / 3600) % 24;
        // console.log('hour difference', hourDifference);

        if (hourDifference > 24){
            midnightUTC.setDate(midnightUTC.getDate() -1);
        }

        varTimer.hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
        varTimer.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        varTimer.seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // console.log('timer : ', varTimer);
        
        return varTimer;
    }

    return(
        <>
        {timer.hours.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
        })}:
        {timer.minutes.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
        })}:
        {timer.seconds.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
        })}
        </>
    );
}

export default Timer;