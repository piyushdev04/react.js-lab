import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [treesGrown, setTreesGrown] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            growTree();
            playSound();
            return 25 * 60;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  const growTree = () => setTreesGrown((count) => count + 1);

  const playSound = () => {
    const audio = new Audio(
      "https://www.soundjay.com/buttons/sounds/button-4.mp3"
    );
    audio.play();
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="App">
      <h1>🌳 Pomodoro Forest 🌳</h1>
      <div className="timer">{formatTime(timeLeft)}</div>
      <div className="buttons">
        {!isRunning ? (
          <button onClick={startTimer}>Start</button>
        ) : (
          <button onClick={pauseTimer}>Pause</button>
        )}
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div className="forest">
        <h2>Your Forest</h2>
        <div className="trees">
          {[...Array(treesGrown)].map((_, i) => (
            <span key={i} className="tree">
              🌳
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
