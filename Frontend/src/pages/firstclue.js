import Loader from "@/components/Loader";
import Game1 from "@/components/game/Game1";
import Game2 from "@/components/game/Game2";
import React, { useEffect, useState, useRef } from "react";

const FirstCluePage = () => {
  const [gameDetails, setGameDetails] = useState();
  const [isLoading, setIsLoading] = useState(1);

  useEffect(() => {
    filterGameFromLocalStorage();
  }, []);

  const gameId = "64402d97635250c6d89d34d8";

  const filterGameFromLocalStorage = () => {
    const gameDetailsFromLocalStorage = localStorage.getItem("allGames");
    if (gameDetailsFromLocalStorage) {
      const gameDetails = JSON.parse(gameDetailsFromLocalStorage);

      const res = gameDetails.filter((game) => game._id === gameId);
      setGameDetails(res[0]?.gameDetails);
      console.log("Res is :- ", res[0]?.gameDetails);
      setIsLoading(0);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {!isLoading &&  gameDetails.gameStatusId === 1 && (
        <Game1 gameDetails={gameDetails} setGameDetails={setGameDetails} />
      )}
      {!isLoading && gameDetails.gameStatusId === 2 && (
        <Game2 gameDetails={gameDetails} setGameDetails={setGameDetails} />
      )}
      {isLoading ? <Loader />:null}
    </div>
  );
};

export default FirstCluePage;
