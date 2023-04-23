import { formatSeconds } from "@/utils";
import React, { useState, useEffect, useRef } from "react";
import DialogBox from "../Extra/DialogBox";

const Game3 = ({ gameDetails, setGameDetails, handleUpdateGameDetails }) => {
  const [guess, setGuess] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [isCompleted, setisCompleted] = useState(false);

  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  const completeGame = () => {
    const allClues = gameDetails.gameClues;

    allClues[2].clueEndTime = new Date();

    handleUpdateGameDetails({
      ...gameDetails,
      gameClues: allClues,
      gameStatusId: 4,
      gameScore: gameDetails.gameScore + 50,
    });

    setGameDetails((gameDetails) => {
      return {
        ...gameDetails,
        gameClues: allClues,
        gameStatusId: 4,
        gameScore: gameDetails.gameScore + 50,
      };
    });
  };

  const handleGuess = (event) => {
    event.preventDefault();
    if (guess.toUpperCase() === "CODE") {
      // Navigate to the next clue or page here
      setisCompleted(true);
    } else {
      window.alert("Wrong Answer");
    }
  };

  const setInitialTimeHandler = () => {
    const today = new Date();
    if (gameDetails.gameClues[2].clueStartTime) {
      const startTime = new Date(gameDetails.gameClues[2].clueStartTime);
      // Return difference in seconds
      const diff = (today.getTime() - startTime.getTime()) / 1000;
      setSeconds(diff);
      console.log("Diff :- ", diff);
      if (diff > 10 * 60) {
        // Redirect to next clue page
        // handleUpdateGameDetails({
        //   ...gameDetails,
        //   gameStatusId:4,
        //   gameEndTime: new Date(),
        // });
        // setGameDetails((gameDetails) => {
        //   return {
        //     ...gameDetails,
        //     gameStatusId: 4,
        //     gameEndTime: new Date(),
        //   };
        // });
        handleSessionTimeOut({
          ...gameDetails,
          gameStatusId: 4,
          
        });
        
      }
    } else {
      const allClues = gameDetails.gameClues;

      allClues[2].clueStartTime = new Date();

      handleUpdateGameDetails({
        ...gameDetails,
        gameClues: allClues,
      });

      setGameDetails((gameDetails) => {
        return {
          ...gameDetails,
          gameClues: allClues,
        };
      });
    }
  };

  useEffect(() => {
    setInitialTimeHandler();
    timerRef.current = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);
  return (
    <div className="text-white">
      <h1 className="text-3xl  font-bold text-center ">
        Second Clue Puzzle - {formatSeconds(seconds)}
      </h1>
      <div className="mt-6">
        <p className="mb-4 text-center">
          Unscramble the letters below to form a word that will give you a clue
          about where to find the next clue:
        </p>
        <p className="mb-4 text-center text-4xl font-bold">EODC</p>
        <form
          onSubmit={handleGuess}
          className="flex   flex-col md:flex-row  justify-center items-center"
        >
          <input
            type="text"
            className={`'w-72 py-2 px-3 rounded  focus:outline-none text-black ', {
              '${
                showMessage && guess.toUpperCase() !== "PUZZLE"
                  ? "border-red-500 "
                  : "border-gray-400"
              },
            }`}
            placeholder="Enter your guess here"
            value={guess}
            onChange={(event) => setGuess(event.target.value)}
          />

          <button
            type="submit"
            className=" ml-3 mt-2 md:mt-0 bg-green-600  hover:bg-green-800 text-white py-2 px-4 rounded focus:outline-none"
          >
            Submit
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-5  ">
          Hint :- Need in programming (C**E){" "}
        </p>
      </div>
      {isCompleted ? (
        <DialogBox
          title={"Congratulations 🎉  "}
          message="You completed this game now click next to find next clue. All the best! "
          ConfirmText={"Next"}
          handleOkayButton={completeGame}
        />
      ) : null}
    </div>
  );
};

export default Game3;
