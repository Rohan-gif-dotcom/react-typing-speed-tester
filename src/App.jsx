import React, { useState, useEffect } from "react";

const sampleText =
  "The quick brown fox jumps over the lazy dog. Practice typing to improve your speed and accuracy.";

export default function App() {
  const [input, setInput] = useState("");
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) timer = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, [isRunning]);

  const handleChange = (e) => {
    if (!isRunning) setIsRunning(true);
    setInput(e.target.value);
  };

  const calculateWPM = () => {
    const words = input.trim().split(/\s+/).length;
    const minutes = time / 60;
    return minutes > 0 ? Math.round(words / minutes) : 0;
  };

  const restart = () => {
    setInput("");
    setTime(0);
    setIsRunning(false);
  };

  const progress = (input.length / sampleText.length) * 100;

  return (
    <div className="container">
      <h1>Typing Speed Tester</h1>

      <div className="text-box">
        {sampleText.split("").map((char, index) => {
          let className = "";
          if (index < input.length) {
            className = char === input[index] ? "correct" : "incorrect";
          }
          return (
            <span key={index} className={className}>
              {char}
            </span>
          );
        })}
      </div>

      <textarea
        value={input}
        onChange={handleChange}
        placeholder="Start typing here..."
        autoFocus
      />

      <div className="stats">
        <p>Time: {time}s</p>
        <p>WPM: {calculateWPM()}</p>
      </div>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>

      <button onClick={restart}>Restart</button>
    </div>
  );
}