import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import DialogBox from "../Extra/DialogBox";
import { useRouter } from "next/router";
import { updateScoreBoard } from "@/actions/games";

const Clues = [
  {
    clue: "Go to this url :- ",
    answer: "Code With Harry",
    url: "https://www.youtube.com/watch?v=BsDoLVMnmZs&t=2s",
  },
  {
    clue: "Go to this url :- ",
    answer: "Shark Tank India",
    url: "https://www.youtube.com/watch?v=sVFZ0udy3eo",
  },
  {
    clue: "Answer is hidden in this url :- ",
    answer: "React Framework",
    url: "https://nextjs.org/",
  },
  {
    clue: "Answer is hidden in this url :- ",
    answer: "The Awkward Dinner",
    url: "https://www.youtube.com/watch?v=Z1VXAxEDIx8",
  },
  {
    clue: "Answer is hidden in this url :- ",
    answer: "The Amazing Spiderman",
    url: "https://www.imdb.com/title/tt0948470/",
  },
];
const Game4 = ({ gameDetails, setGameDetails, handleUpdateGameDetails }) => {
  const Router = useRouter();
  const [currStr, setCurrStr] = React.useState("");
  const [emptyThree, setEmptyThree] = React.useState([0, 1, 2]);
  const [currInput, setCurrInput] = React.useState({});
  const [score, setScore] = useState(0);
  const [quesIndex, setQuesIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  let newInput = {};

  function getRandomFromArray(array) {
    const randIdx = Math.floor(Math.random() * array.length);
    return array[randIdx];
  }

  const initGame = React.useCallback(() => {
    setCurrInput({});
    // eslint-disable-next-line
    newInput = {};

    console.log(quesIndex, " Ques Index");
    console.log(currStr, " Curr Str");

    let possibleIdx = [];
    for (let i = 0; i < Clues[quesIndex].answer.length; i++) {
      if (Clues[quesIndex].answer[i] !== " ") {
        possibleIdx.push(i);
      }
    }
    console.log(possibleIdx, " Possible Idx");

    const emptyIdx = [];
    for (let i = 0; i < 3; i++) {
      const choosed = getRandomFromArray(possibleIdx);
      possibleIdx = possibleIdx.filter((ele) => ele !== choosed);

      if (choosed - 1 < Clues[quesIndex].answer.length)
        emptyIdx.push(choosed - 1);
    }
    setEmptyThree(emptyIdx);
    console.log(emptyIdx, " Empty Idx");
  }, []);

  React.useEffect(() => {
    initGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const blocks = Clues[quesIndex].answer.split("").map((ele, idx) => {
    if (emptyThree.includes(idx)) {
      return (
        <div className="blanko-blocks" key={idx}>
          <input
            type="text"
            className="blanko-input-box"
            name={idx}
            value={currInput[idx] !== undefined ? currInput[idx] : ""}
            onChange={handleChange}
          ></input>
        </div>
      );
    }
    return (
      <div className="blanko-blocks" key={idx}>
        <div className="blanko-text">{ele}</div>
      </div>
    );
  });

  const gameCompleted = () => {
    const allClues = gameDetails.gameClues;

    allClues[3].clueEndTime = new Date();

    handleUpdateGameDetails({
      ...gameDetails,
      gameClues: allClues,
      gameStatusId: 5,
      gameScore: gameDetails.gameScore,
      gameStatus: "Completed",
      gameEndTime: new Date(),
    });
    const UserData = JSON.parse(localStorage.getItem("userdata"));
    updateScoreBoard(UserData?._id, { score: gameDetails.gameScore });

    localStorage.setItem("userdata", JSON.stringify({
      ...UserData,
      totalScore : UserData.totalScore + gameDetails.gameScore
    }));

    setGameDetails((gameDetails) => {
      return {
        ...gameDetails,
        gameClues: allClues,
        gameStatusId: 5,
        gameScore: gameDetails.gameScore,
        gameStatus: "Completed",
        gameEndTime: new Date(),
      };
    });
    Router.replace("/success");
  };

  function checkUserInputs(userInput) {
    let isCorrect = true;
    if (
      Object.values(userInput).length === 3 &&
      !Object.values(userInput).includes("")
    ) {
      for (let k of Object.keys(userInput)) {
        const v = userInput[k].toLowerCase();
        if (v !== Clues[quesIndex].answer.toLowerCase().charAt(k)) {
          isCorrect = false;
          break;
        }
      }
    } else {
      isCorrect = false;
    }
    if (isCorrect) {
      if (Clues.length - 1 === quesIndex) {
        window.alert("You have completed the game");
        setIsCompleted(true);
        return;
      }

      // show success info
      window.alert("Correct!");
      setQuesIndex((q) => {
        return q + 1;
      });
      setGameDetails((prevData) => {
        return {
          ...prevData,
          gameScore: prevData.gameScore + 20,
        };
      });

      setScore((s) => {
        return s + 20;
      });

      // reset
      initGame();
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setCurrInput((prevData) => ({ ...prevData, [name]: value }));
    newInput[name] = value;
    checkUserInputs({ ...currInput, ...newInput });
  }

  return (
    <div className="page-container ">
      <div className="container">
        <div id="block-container">{blocks}</div>
        <p className="text-gray-200  text-center mb-5  ">
          Hint:- {Clues[quesIndex].clue}{" "}
          <a href={Clues[quesIndex].url} target="_blank">
            {Clues[quesIndex].url}
          </a>
        </p>

        <div className="flex justify-center">
          <Button
            color="red"
            buttonType="filled"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="light"
            onClick={() => {
              // checkUserInputs(currInput)
              if (Clues.length - 1 === quesIndex) {
                window.alert("You have completed the game");
                setIsCompleted(true);
                return;
              }

              setQuesIndex((q) => {
                return q + 1;
              });
              initGame();
            }}
            className="ml-4"
          >
            Skip
          </Button>
        </div>
      </div>

      {isCompleted ? (
        <DialogBox
          title={"Congratulations 🎉  "}
          message={`You completed all the game you scored total ${gameDetails?.gameScore} points `}
          ConfirmText={"Next"}
          handleOkayButton={gameCompleted}
        />
      ) : null}
    </div>
  );
};

export default Game4;
