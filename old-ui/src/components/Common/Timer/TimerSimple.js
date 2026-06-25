import React, {useState, useEffect, useRef} from 'react'
import './timer.css'

const STATUS = {
  STARTED: 'Started',
  STOPPED: 'Stopped',
}

const secondsInTheFuture = new Date("2024-03-20T12:00:00Z").getTime() / 1000;
const secondsNow = new Date().getTime() / 1000;
const difference = Math.round(secondsInTheFuture - secondsNow);
const INITIAL_COUNT = difference

export default function Timer() {
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT)
  const [status, setStatus] = useState(STATUS.STOPPED)

  const secondsToDisplay = secondsRemaining % 60
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60
  const minutesToDisplay = minutesRemaining % 60
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60

  const daysRemaining = Math.floor(hoursToDisplay / 24);
  const hoursWithoutDays = hoursToDisplay % 24;

  const handleStart = () => {
    setStatus(STATUS.STARTED)
  }
  const handleStop = () => {
    setStatus(STATUS.STOPPED)
  }
  const handleReset = () => {
    setStatus(STATUS.STOPPED)
    setSecondsRemaining(INITIAL_COUNT)
  }
  useEffect(() => {
    handleStart()
  }, [])
  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1)
      } else {
        setStatus(STATUS.STOPPED)
      }
    },
    status === STATUS.STARTED ? 1000 : null,
    // passing null stops the interval
  )
  return (
    <div className="timer">
      <div style={{padding: 20}}>
        {twoDigits(hoursWithoutDays)}:{twoDigits(minutesToDisplay)}:{twoDigits(secondsToDisplay)}
      </div>
      <div>{daysRemaining}</div>
    </div>
  )
}

// source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

// https://stackoverflow.com/a/2998874/1673761
const twoDigits = (num) => String(num).padStart(2, '0')
