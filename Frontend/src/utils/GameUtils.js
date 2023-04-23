const { updateGame } = require("@/actions/games");

export const completeInProgreesGame = async (id, details) => {
  const dataFromLocalStorage = localStorage.getItem("allGames");
  if (dataFromLocalStorage) {
    const allGames = JSON.parse(dataFromLocalStorage);
    console.log("All Games are:- ");
    const res = allGames.filter((game) => game._id === id);
    // console.log("Res of final is:- ",id, " ID:- ",res)
    // return;
    res[0].gameDetails = {
      ...res[0].gameDetails,
      ...details,
      gameStatus: "InCompleted",
      gameEndTime: new Date(),
    };
    updateGame(res[0]._id, { gameDetails: res[0].gameDetails });
    localStorage.setItem("allGames", JSON.stringify(allGames));
  }
};

export const findGameScoreByTimeDiff = (startTime, endTime, gameScore) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const diff = end.getTime() - start.getTime();
  const diffMins = Math.round(diff / 60000);

//   if (diffMins <= 5) {
//     return gameScore+10;
//   } else if (diffMins > 5 && diffMins <= 10) {
//     return  gameScore+8;
//   } else if (diffMins > 10 && diffMins <= 15) {
//     return  gameScore+5;
//   } else if (diffMins > 15 && diffMins <= 20) {
//     return gameScore+2;
//   } else return gameScore+1;

    if(diffMins<=1){
        return gameScore+100;

    }else if(diffMins>1 && diffMins<=2){
        return gameScore+80;
    } else if(diffMins>2 && diffMins<=3){
        return gameScore+60;
    }
    else if(diffMins>3 && diffMins<=4){
        return gameScore+40;
    }
    else if(diffMins>4 && diffMins<=5){
        return gameScore+20;
    }
    else if(diffMins>5 && diffMins<=6){
        return gameScore+10;
    }
    else if(diffMins>6 && diffMins<=7){
        return gameScore+5;
    }
    else if(diffMins>7 ){

        return gameScore+2;
    }

};
