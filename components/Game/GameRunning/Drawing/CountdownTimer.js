import React, { useState, useEffect } from 'react'

export default function CountdownTimer({ endTime }) {
  const [timeLeft, setTimeLeft] = useState(endTime - Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(endTime - Date.now())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return <div>Time left: {timeLeft / 1000} seconds</div>
}
