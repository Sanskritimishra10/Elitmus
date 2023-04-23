import { completeInProgreesGame, findGameScoreByTimeDiff } from "@/utils/GameUtils";
import React, { useEffect, useState, useRef } from "react";
import DialogBox from "../Extra/DialogBox";
import { useRouter } from "next/router";

const Game1 = ({ setGameDetails, gameDetails ,handleUpdateGameDetails ,handleSessionTimeOut }) => {
  const [answer, setAnswer] = useState("");
  const [seconds, setSeconds] = useState(0);
  // const count = useRef(0);

  const timerRef = useRef(null);
  const riddle =
    "I am not alive, but I grow; I don't have lungs, but I need air; I don't have a mouth, but water kills me. What am I?";

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleAnswerSubmit = (event) => {
    event.preventDefault();
    if (answer.toLowerCase() === "fire") {
      const score =  findGameScoreByTimeDiff(gameDetails?.gameStartTime, new Date() , gameDetails?.gameScore )
      // Redirect to next clue page
      handleUpdateGameDetails({
        ...gameDetails,
        gameStatusId: 2,
        gameEndTime: new Date(),
        gameScore: score,
      });

      setGameDetails((gameDetails) => {
        return {
          ...gameDetails,
          gameStatusId: 2,
          gameEndTime: new Date(),
          gameScore: score,
        };
      });
    } else {
      // Show error message
      alert("Incorrect answer. Please try again.");
    }
  };

  const formatSeconds = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${parseFloat(minutes)}:${
      Math.round(remainingSeconds) < 10 ? "0" : ""
    }${Math.round(remainingSeconds)}`;
  };

  const setInitialTimeHandler = () => {
    const today = new Date();
    const startTime = new Date(gameDetails.gameStartTime);
    // Return difference in seconds
    const diff = (today.getTime() - startTime.getTime()) / 1000;
    setSeconds(diff);
    console.log("Diff :- ", diff);
    if (diff > 10*60) {
      handleSessionTimeOut();
    }
    // count.current = diff;
  };

  

  useEffect(() => {
    setInitialTimeHandler();
    timerRef.current = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
      
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);
  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
      <p className="absolute mt-1  ml-56 ">&#128293;</p>
      <h1 className="text-2xl font-bold mb-4">
        Clue Game {formatSeconds(seconds)}
      </h1>
      <p className="mb-3">{riddle}</p>
      {/* Add hint */}
      <p className="text-sm text-gray-600 mb-4">
        Hint:- Answer is hidden in this page
      </p>
      <form onSubmit={handleAnswerSubmit}>
        <div className="flex items-center mb-4">
          <label htmlFor="answer" className="mr-4">
            Answer:
          </label>
          <input
            type="text"
            id="answer"
            value={answer}
            onChange={handleAnswerChange}
            className="border border-gray-400 p-2 rounded-lg flex-1  "
            placeholder="Write your answer here"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Submit Answer
        </button>
      </form>
      

    </div>
  );
};

export default Game1;
