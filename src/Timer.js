import React, { useState, useEffect, useRef } from 'react';

const Timer = () => {
  const [time, setTime] = useState(0); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      setIsPaused(false);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Increment every 10 ms
      }, 10);
    } else if (isPaused) {
      setIsPaused(false);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
  };

  const pauseTimer = () => {
    if (isRunning) {
      setIsPaused(true);
      clearInterval(intervalRef.current);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    clearInterval(intervalRef.current);
    setTime(0);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const formatTime = () => {
    const hours = String(Math.floor(time / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(time % 1000).padStart(3, '0').slice(0, 2); // Show only two digits
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.timerText}>Timer: {formatTime()}</h1>
      <div style={styles.buttonContainer}>
        <button
          style={{ ...styles.button, backgroundColor: '#28a745' }}
          onClick={startTimer}
          disabled={isRunning && !isPaused}
        >
          {isRunning && isPaused ? 'Resume' : 'Start'}
        </button>
        <button
          style={{ ...styles.button, backgroundColor: '#ffc107' }}
          onClick={pauseTimer}
          disabled={!isRunning || isPaused}
        >
          Pause
        </button>
        <button
          style={{ ...styles.button, backgroundColor: '#dc3545' }}
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

// CSS Styles
const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '300px',
    margin: 'auto',
  },
  timerText: {
    fontSize: '2em',
    color: '#333',
    margin: '20px 0',
    fontFamily: 'Arial, sans-serif',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '20px',
  },
  button: {
    fontSize: '1em',
    color: '#fff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default Timer;
