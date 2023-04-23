import { formatSeconds } from "@/utils";
import React, { useState, useRef } from "react";
import DialogBox from "../Extra/DialogBox";
const a =
  "https://raw.githubusercontent.com/ivyliu1205/ReactMiniGames/main/src/data/shrek/1.png";
const b =
  "https://raw.githubusercontent.com/ivyliu1205/ReactMiniGames/main/src/data/shrek/2.png";
const c =
  "https://raw.githubusercontent.com/ivyliu1205/ReactMiniGames/main/src/data/shrek/3.png";
const d =
  "https://raw.githubusercontent.com/ivyliu1205/ReactMiniGames/main/src/data/shrek/4.png";
const e =
  "https://raw.githubusercontent.com/ivyliu1205/ReactMiniGames/main/src/data/shrek/5.png";
const f =
  "https://raw.githubusercontent.com/ivyliu1205/ReactMiniGames/main/src/data/shrek/6.png";
const g =
  "https://raw.githubusercontent.com/ivyliu1205/ReactMiniGames/main/src/data/shrek/7.png";
const h =
  "https://raw.githubusercontent.com/ivyliu1205/ReactMiniGames/main/src/data/shrek/8.png";

export default function Game2({
  gameDetails,
  setGameDetails,
  handleUpdateGameDetails,
  handleSessionTimeOut,
}) {
  const results = [a, b, c, d, e, f, g, h, ""];
  const [game, setGame] = React.useState([]);
  const [disable, setDisable] = React.useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  const connected = {
    0: [1, 3],
    1: [0, 2, 4],
    2: [1, 5],
    3: [0, 4, 6],
    4: [1, 3, 5, 7],
    5: [2, 4, 8],
    6: [3, 7],
    7: [4, 6, 8],
    8: [7, 5],
  };
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  function shuffleArray(array) {
    const newArr = array.slice();
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr;
  }

  React.useEffect(() => {
    setGame(shuffleArray(results));
    // eslint-disable-next-line
  }, []);

  const blocks = game.map((ele, idx) => {
    if (ele === "") {
      return <div className="slido-blocks" name={idx} key={idx}></div>;
    }
    return (
      <img
        className="slido-blocks"
        src={ele}
        name={idx}
        onClick={handleClick}
        alt={"img " + idx}
        key={idx}
      />
    );
  });

  const checkStatus = () => {
    let isEqual = true;
    for (let idx = 0; idx < 9; idx++) {
      if (results[idx] !== game[idx]) {
        isEqual = false;
        break;
      }
    }
    if (isEqual) {
      setIsCompleted(true);
    }
  };

  function getNextStep(curr) {
    let moveTo = null;
    for (const conn of connected[curr]) {
      if (game[conn] === "") {
        moveTo = conn;
        break;
      }
    }
    return moveTo;
  }

  function handleClick(event) {
    const { name } = event.target;

    let moveTo = getNextStep(name);

    const newGame = game.slice();
    if (moveTo !== null) {
      newGame[moveTo] = newGame[name];
      newGame[name] = "";
      setGame(newGame);
      setDisable(false);
    }
  }

  React.useEffect(() => {
    checkStatus();
    // eslint-disable-next-line
  }, [game]);

  function handleSolve() {
    setGame(results);
    setDisable(true);
  }

  function handleReset() {
    setGame(shuffleArray(results));
  }

  // Skip CLue Function
  const handleSkipClue = () => {
    handleUpdateGameDetails({
      ...gameDetails,
      gameStatusId: 3,
    });
    setGameDetails((gameDetails) => {
      return {
        ...gameDetails,
        gameStatusId: 3,
      };
    });
  };

  // Next Button Handler

  const handleNextButton = () => {
    handleUpdateGameDetails({
      ...gameDetails,
      gameStatusId: 3,
      gameScore :  gameDetails.gameScore + 100,
    });
    setGameDetails((gameDetails) => {
      return {
        ...gameDetails,
        gameStatusId: 3,
      gameScore :  gameDetails.gameScore + 100,

      };
    });
    setIsCompleted(false);
  };

  // Initial Time Handler
  const setInitialTimeHandler = () => {
    const today = new Date();
    if (gameDetails.gameClues[1].clueStartTime) {
      const startTime = new Date(gameDetails.gameClues[1].clueStartTime);
      // Return difference in seconds
      const diff = (today.getTime() - startTime.getTime()) / 1000;
      setSeconds(diff);
      console.log("Diff :- ", diff);
      if (diff > 10 * 60) {
        // // Redirect to next clue page
        // handleUpdateGameDetails({
        //   ...gameDetails,
        //   gameStatusId: 3,
        // });
        setGameDetails((gameDetails) => {
          return {
            ...gameDetails,
            gameStatusId: 3,
          };
        });
      }
      if (diff > 40 * 60) {
        // handleSessionTimeOut()
      }
    } else {
      const allClues = gameDetails.gameClues;

      allClues[1].clueStartTime = new Date();

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

  // Timer
  React.useEffect(() => {
    setInitialTimeHandler();
    timerRef.current = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div>
      <div id="slido-container">
        {/* Add Time  */}
        <div className="flex justify-end items-right">
          <div className="text-2xl font-bold text-gray-400">
            Time: {formatSeconds(seconds)}
          </div>
        </div>

        <div className="slido-block-rows">
          {blocks[0]}
          {blocks[1]}
          {blocks[2]}
        </div>
        <div className="slido-block-rows">
          {blocks[3]}
          {blocks[4]}
          {blocks[5]}
        </div>
        <div className="slido-block-rows">
          {blocks[6]}
          {blocks[7]}
          {blocks[8]}
        </div>
      </div>
      <div id="slido-btn-container" className="flex justify-between">
        {/* <button
          id="slido-solve-"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10 flex items-center mr-5"
          onClick={handleSolve}
        >
          Solve
        </button> */}
        <button
          id="slido-reset-btn"
          className={`  text-white font-bold py-2 px-4 rounded  flex items-center ${
            !disable
              ? "bg-blue-200 cursor-not-allowed "
              : "bg-blue-500 hover:bg-blue-700 cursor-pointer"
          } `}
          disabled={!disable}
          onClick={handleReset}
        >
          Reset
        </button>

        {/* Skip Button */}
        <button
          id="slido-skip-btn"
          className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded  flex items-center ml-5"
          onClick={handleSkipClue}
        >
          Skip
        </button>
      </div>

      {isCompleted ? (
        <DialogBox
          title={"Congratulations 🎉  "}
          message="You completed this game now click next to find next clue. All the best! "
          ConfirmText={"Next"}
          handleOkayButton={handleNextButton}
        />
      ) : null}
    </div>
  );
}
