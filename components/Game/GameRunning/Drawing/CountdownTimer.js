import React, { useState, useEffect } from 'react'

export default function CountdownTimer({ time }) {
  const [timeLeft, setTimeLeft] = useState(time)

  useEffect(() => {
    const updateInterval = 100

    const interval = setInterval(() => {
      setTimeLeft(timeLeft => {
        const newTimeLeft = timeLeft - updateInterval

        if (newTimeLeft <= 0) {
          return 0
        }

        return newTimeLeft
      })
    }, updateInterval)

    return () => {
      clearInterval(interval)
    }
  }, [])

  if (timeLeft == 0) {
    return <div>{"Time's up"}</div>
  }

  return <div>Time left: {(timeLeft / 1000).toFixed(0)} seconds</div>
}
