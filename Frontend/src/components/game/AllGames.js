import React, { useEffect, useState } from "react";
import Game1 from "./Game1";
import Game2 from "./Game2";
import Loader from "../Loader";
import { updateGame } from "@/actions/games";
import DialogBox from "../Extra/DialogBox";
import { useRouter } from "next/router";
import { completeInProgreesGame } from "@/utils/GameUtils";
import TotalScore from "./TotalScore";
import Game3 from "./Game3";
import Game4 from "./Game4";

const AllGames = ({ gameId }) => {
  const Router = useRouter();
  const [gameDetails, setGameDetails] = useState();
  const [isLoading, setIsLoading] = useState(1);
  const [isShowDialog, setIsShowDialog] = useState(false);

  useEffect(() => {
    filterGameFromLocalStorage();
  }, []);

  const filterGameFromLocalStorage = () => {
    const gameDetailsFromLocalStorage = localStorage.getItem("allGames");
    if (
      gameDetailsFromLocalStorage &&
      gameDetailsFromLocalStorage != "undefined"
    ) {
      const gameDetails = JSON.parse(gameDetailsFromLocalStorage);

      const res = gameDetails.filter((game) => game._id === gameId);
      setGameDetails(res[0]?.gameDetails);
      console.log("Res is :- ", res[0]?.gameDetails);
      setIsLoading(0);
    }
  };

  const handleUpdateGameDetails = (newDetails) => {
    const gameDetailsFromLocalStorage = localStorage.getItem("allGames");
    if (gameDetailsFromLocalStorage) {
      const allGames = JSON.parse(gameDetailsFromLocalStorage);

      const res = allGames.filter((game) => game._id === gameId);
      res[0].gameDetails = newDetails;
      updateGame(res[0]._id, { gameDetails: newDetails });
      localStorage.setItem("allGames", JSON.stringify(allGames));
    }
  };

  const handleSessionTimeOut = (newDetails) => {
    setIsShowDialog(true);
    completeInProgreesGame(gameId, newDetails?newDetails:gameDetails);
  };
  const handleGoBack = () => {
    setIsShowDialog(false);
    Router.push("/dashboard");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="fixed top-0 right-0">
        <TotalScore score={gameDetails?.gameScore} />
      </div>
      {!isLoading && gameDetails?.gameStatusId === 1 && (
        <Game1
          gameDetails={gameDetails}
          setGameDetails={setGameDetails}
          handleUpdateGameDetails={handleUpdateGameDetails}
          handleSessionTimeOut={handleSessionTimeOut}
        />
      )}
      {!isLoading && gameDetails?.gameStatusId === 2 && (
        <Game2 gameDetails={gameDetails} setGameDetails={setGameDetails} handleUpdateGameDetails={handleUpdateGameDetails} handleSessionTimeOut= {handleSessionTimeOut} />
      )}
      {!isLoading && gameDetails?.gameStatusId === 3 && (
        <Game3 gameDetails={gameDetails} setGameDetails={setGameDetails} handleUpdateGameDetails={handleUpdateGameDetails} handleSessionTimeOut= {handleSessionTimeOut} />
      )}
      {!isLoading && gameDetails?.gameStatusId === 4 && (
        <Game4 gameDetails={gameDetails} setGameDetails={setGameDetails} handleUpdateGameDetails={handleUpdateGameDetails} handleSessionTimeOut= {handleSessionTimeOut} />
      )}

      {isLoading ? <Loader /> : null}

      {/* Dialog */}
      {isShowDialog ? (
        <DialogBox
          title={"Times up! 🕑"}
          message={
            "Session time for  this game is over! Now you are not alowed to play this game. Go to your dashboard to play new game"
          }
          handleOkayButton={handleGoBack}
        />
      ) : null}
    </div>
  );
};

export default AllGames;
