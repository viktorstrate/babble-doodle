import React, { useState, useEffect } from 'react'

export default function CountdownTimer({ time }) {
  const [timeLeft, setTimeLeft] = useState(time)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(timeLeft => {
        const newTimeLeft = timeLeft - 1000

        if (newTimeLeft <= 0) {
          return 0
        }

        return newTimeLeft
      })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  if (timeLeft == 0) {
    return <div>{"Time's up"}</div>
  }

  return <div>Time left: {timeLeft / 1000} seconds</div>
}
