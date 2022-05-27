import React, { useEffect, useState } from 'react'
import Lap from './Lap'
import styles from './stop.module.css'

const Stopwatch = () => {
 
    const [timer,setTimer]=useState(0)
    const [timerOn,setTimerOn]=useState(false)
    const [lap,setLap]=useState([])
    let m =('0'+Math.floor(timer/60000)%60).slice(-2);
    let s =('0'+Math.floor(timer/1000)%60).slice(-2);
    let ms =('0'+(timer/10)%100).slice(-2);
    useEffect(()=>{
        let id = null;
        if(timerOn)
        {
            id = setInterval(() => {
                setTimer((timer)=>timer+10)
            }, 10);
        }
        else{
            clearInterval(id)  
        }
        
        return ()=>{        
            clearInterval(id)
        }

    },[timerOn])

//    const lap =()=> {
//     console.log(m,':',s,':',ms);
//    }
 
  return (
    <>
    <div>
        <h1>Stopwatch</h1>
    </div>
    <div>
        <span><h1 className={styles.block}>{m}</h1>m </span>
        <span><h1 className={styles.block}>{s}</h1>s </span>
        <span><h1 className={styles.block}>{ms}</h1>ms</span>
    </div>
    {timer===0 && !timerOn &&(
        <button onClick={()=>{setTimerOn(true)}}>Start</button>
    )}
    {timerOn &&(
    <button onClick={()=>{setTimerOn(false)}}>Stop</button>
    )}
    {timer!==0 && !timerOn &&(
    <button onClick={()=>{setTimerOn(true)}}>Resume</button>
    )}
    {timer>0 && !timerOn &&(
    <button onClick={()=>{setTimer(0)}}>Reset</button>
    )}
    <button onClick={()=>{setLap([[`${m}:${s}:${ms}`],...lap])}}>LAP</button>
    {lap.map((el,ind)=>(<Lap lap={el} ind={ind}/>))}
    </>
  )
}

export default Stopwatch