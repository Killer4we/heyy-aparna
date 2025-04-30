import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import "./App.css";

export default function App() {
  const [step, setStep] = useState("birthday");
  const [input, setInput] = useState("");
  const [noBtnPos, setNoBtnPos] = useState({ top: "50%", left: "60%" });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleBirthdaySubmit = () => {
    if (input === "1310") {
      setStep("askDate");
    } else {
      alert("Wrong date! Try again");
    }
  };

  const moveNoButton = () => {
    const top = Math.random() * 100 + "%";
    const left = Math.random() * 100 + "%";
    setNoBtnPos({ top, left });
  };

  return (
    <div className="container">
      {step === "birthday" && (
        <div className="card">
          <h1>Hey Aparna 💕</h1>
          <p>Enter your birthday in DDMM format to proceed:</p>
          <input
            type="text"
            maxLength={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleBirthdaySubmit}>Submit</button>
        </div>
      )}

      {step === "askDate" && (
        <div className="card">
          <img
            src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif"
            alt="Cute Cat"
            className="cat-img"
          />
          <h2>Will you go on a date with me? 🥺</h2>
          <div className="btn-wrapper">
            <button
              className="no-btn"
              style={{ top: noBtnPos.top, left: noBtnPos.left, position: "absolute" }}
              onMouseEnter={moveNoButton}
            >
              No
            </button>
            <button
              className="yes-btn"
              onClick={() => setStep("yay")}
            >
              Yes
            </button>
          </div>
        </div>
      )}

      {step === "yay" && (
        <div className="card">
          <Confetti width={windowSize.width} height={windowSize.height} />
          <h1>YAYYY!! 🎉🎉</h1>
          <p>Can't wait for our date 😍</p>
        </div>
      )}
    </div>
  );
}
