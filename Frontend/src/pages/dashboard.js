//  Create a user dashboard page in react with style using tailwind which have :-
// 1. User details -  Name , Email , Total played games and Logout Button
// 2. All Played Games -  Name of Game ,  Time taken , accuracy  with written total games
// 3. Play button

import { addGame, getGameById, getLeaderBoard } from "@/actions/games";
import UserCharts from "@/components/Charts/UserCharts";
import Leaderboard from "@/components/Dashboard/Leaderboard";
import Userlayout from "@/components/Layout/Userlayout";
import { formatDiffOfStartAndEndTime } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function UserDashboard() {
  const Router = useRouter();

  const [user, setUser] = useState({
    name: "Loading...",
    email: "Loading...",
  });
  const [isLoading, setIsLoading] = useState(0);
  const [isDataLoading, setIsDataLoading] = useState(1);
  const [InProgressGames, setInProgressGames] = useState([]);
  const [CompletedGames, setCompletedGames] = useState([]);
  const [allLeaderboardData, setAllLeaderboardData] = useState([]);
  const [pageindex, setPageindex] = useState({
    InProgress: 5,
    Completed: 5,
  });

  
  const showMoreInProgress = () => {
    setPageindex((pageindex) => {
      return {
        ...pageindex,
        InProgress: pageindex.InProgress + 5,
      };
    });
  };

  const showMoreCompleted = () => {
    setPageindex((pageindex) => {
      return {
        ...pageindex,
        Completed: pageindex.Completed + 5,
      };
    });
  };


  const startGame = () => {
    console.log("user", user);
    setIsLoading(true);
    // Cancel Scroll
    // scroll to top
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    document.body.style.overflow = "hidden";
    addGame({
      userID: user._id,
      gameDetails: {
        gameStatus: "InProgress",
        gameStatusId: 1,
        gameStartTime: new Date(),
        gameEndTime: null,
        gameScore: 0,
        gameClues: [
          {
            clueId: 1,
            clueName: "Clue 1",
            clueStartTime: null,
            clueEndTime: null,
            clueScore: 0,
            clueStatus: "InProgress",
            clueStatusId: 1,
          },
          {
            clueId: 1,
            clueName: "Clue 2",
            clueStartTime: null,
            clueEndTime: null,
            clueScore: 0,
            clueStatus: "InProgress",
            clueStatusId: 1,
          },
          {
            clueId: 1,
            clueName: "Clue 1",
            clueStartTime: null,
            clueEndTime: null,
            clueScore: 0,
            clueStatus: "InProgress",
            clueStatusId: 1,
          },
          {
            clueId: 1,
            clueName: "Clue 1",
            clueStartTime: null,
            clueEndTime: null,
            clueScore: 0,
            clueStatus: "InProgress",
            clueStatusId: 1,
          },
        ],
      },
    })
      .then((res) => {
        console.log("res", res);
        if (res.status === 201) {
          const localStorageGame = localStorage.getItem("allGames");
          if (localStorageGame) {
            const allGames = JSON.parse(localStorageGame);
            allGames.push(res.data.data);
            localStorage.setItem("allGames", JSON.stringify(allGames));
          } else {
            localStorage.setItem("allGames", JSON.stringify([res.data.data]));
          }

          // Add Interval
          setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "auto";
            Router.push(`/game/${res.data.data._id}`);
            console.log("myTimeout");
          }, 1000);
        }
        setTimeout(() => {
          document.body.style.overflow = "auto";
          setIsLoading(false);
        }, 1000);
      })
      .catch((err) => {
        document.body.style.overflow = "auto";

        alert("Something went wrong");
        setIsLoading(false);
      });
  };
  const logOutHandler = () => {
    localStorage.removeItem("userdata");
    localStorage.removeItem("gameDetails");
    localStorage.removeItem("allGames");
    localStorage.removeItem("latestUpdatedTime");
    Router.push("/auth/login");
  };

  const [allGames, setAllGames] = useState([]);

  // Create a Function which 2 time as a parameter and return is difference is greater than 5 minutes or not
  const isTimeGreater = (time2) => {
    const time1Date = new Date();
    const time2Date = new Date(time2);
    const diff = time1Date.getTime() - time2Date.getTime();
    const diffMins = Math.round(diff / 60000);
    console.log("diffMins", diffMins);
    if (diffMins > 5) {
      return true;
    }
    return false;
  };

  const fetchGames = (id) => {
    // Fetch Games
    getGameById(id).then((res) => {
      if (res.status === 200) {
        setAllGames(res.data.data);
        localStorage.setItem("allGames", JSON.stringify(res.data.data));
        console.log("res.data.data", res.data.data);
        filterProgressAndCompletedGames(res.data.data);
      }
      setIsDataLoading(false);
    });
  };

  const formatTime = (time) => {
    const date = new Date(time);

    // dd-mm-yyyy

    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();

    const hh = date.getHours();
    const min = date.getMinutes();
    const ss = date.getSeconds();

    // convert this hr to 12 hr format and add am/pm
    const hr12 = hh > 12 ? hh - 12 : hh;
    const ampm = hh >= 12 ? "PM" : "AM";

    return `${dd}-${mm}-${yyyy} ${
      hr12 == 0 ? "01" : hr12 > 9 ? hr12 : "0" + hr12
    }:${min > 9 ? min : "0" + min}:${ss > 9 ? ss : "0" + ss} ${ampm}`;

    // return `${dd}-${mm}-${yyyy} ${hh}:${min}:${ss}`;

    // return `${dd}-${mm}-${yyyy}`;

    // return `${hh}:${min}:${ss}`;

    // return `${hh}:${min}`;
  };

  const LeaderboardResultHandler = (gameId) => {
    getLeaderBoard().then((data, index)=>{
      console.log("getLeaderBoard ",data.data.data);
      if(data.status === 200){
        setAllLeaderboardData(data.data.data);
      }
    })
  };

  useEffect(() => {
    const userLocalStorage = localStorage.getItem("userdata");
    if (userLocalStorage) {
      // console.log("userLocalStorage", userLocalStorage?.name);
      const parsedUser = JSON.parse(userLocalStorage);
      setUser(JSON.parse(userLocalStorage));
      fetchGames(parsedUser?._id);
      LeaderboardResultHandler();
    } else {
      Router.push("/auth/login");
    }
  }, []);

  const filterProgressAndCompletedGames = (gamesData) => {
    console.log("gamesData", gamesData);
    const InProgressGames = gamesData.filter((game) => {
      return game?.gameDetails?.gameStatus === "InProgress";
    });
    const CompletedGames = gamesData.filter((game) => {
      return game?.gameDetails?.gameStatus !== "InProgress";
    });
    setInProgressGames(InProgressGames);
    setCompletedGames(CompletedGames);
  };
  useEffect(() => {
    filterProgressAndCompletedGames(allGames);
  }, [allGames]);

  return (
    <Userlayout>
      <div
        className="bg-gray-100 h-full "
        style={{
          background: "rgba( 0, 4, 15, 1 )",
        }}
      >
        <div className="container mx-auto py-8">
          <div
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            style={{
              background: "rgba( 248, 250, 251, 0.9)",
              boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
              backdropFilter: "blur( 12.5px )",
              WebkitBackdropFilter: " blur( 12.5px )",
              borderRadius: "10px",
              border: "1px solid rgba( 255, 255, 255, 0.18 )",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold ">User Details</h1>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={logOutHandler}
              >
                Logout
              </button>
            </div>
            <div>
              <p>
                <span className="font-bold">Name: </span>
                {user.name}
              </p>
              <p className="mt-2">
                <span className="font-bold ">Email: </span>
                {user.email}
              </p>
              <p className="mt-2">
                <span className="font-bold ">Total Games Played: </span>
                {allGames?.length}
              </p>
              <p className="mt-2">
                <span className="font-bold ">Total Score: </span>
                {user?.totalScore}
              </p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold">
                InProgress Games ({InProgressGames?.length})
              </h1>
            </div>
            <div>
              {isDataLoading ? (
                <div className="flex justify-center items-center pt-10 pb-10 ">
                  <div className="w-12 h-12 border-2  rounded-full animate-spin loader border-blue-300">
                    {" "}
                  </div>
                </div>
              ) : null}

              {!isDataLoading && InProgressGames?.length === 0 ? (
                <div className="flex justify-center items-center pt-10 pb-10 ">
                  <p className="text-gray-500">No InProgress Games</p>
                </div>
              ) : null}
              {InProgressGames?.slice(0, pageindex?.InProgress)?.map((game, index) => (
                <div
                  key={index}
                  className="border-b border-gray-400 py-2 flex justify-between items-center "
                >
                  {console.log("game:- ", game)}
                  <div>
                    <p>
                      <span className="font-bold">Name of Game: </span>
                      Puzzle Game
                    </p>
                    <p>
                      <span className="font-bold">Score: </span>
                      {game?.gameDetails?.gameScore}
                    </p>
                    <p>
                      <span className="font-bold">Accuracy: </span>
                      {formatTime(game?.gameDetails?.gameStartTime)}
                    </p>
                  </div>
                  <Link href={`/game/${game?._id}`} target="_blank" >
                   
                    <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10 flex items-center">
                      Resume
                    </div>
                  </Link>
                </div>
              ))}
              {!isLoading &&
              InProgressGames?.length > 5 &&
              pageindex.InProgress < InProgressGames?.length ? (
                <div className="w-full mt-5 flex justify-center ">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4   " onClick={showMoreInProgress} >
                    Show More
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold">
                All Played Games ({CompletedGames?.length})
              </h1>
              {CompletedGames?.length ? (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={startGame}
                >
                  Play
                </button>
              ) : null}
            </div>
            <div>
              {CompletedGames?.slice(0, pageindex.Completed).map((game) => (
                <div key={game._id} className="border-b border-gray-400 py-2">
                  <div className="flex flex-col  md:flex-row md:justify-between md:items-center">
                    <p>
                      <span className="font-bold">Name of Game: </span>
                      puzzle Game
                    </p>
                    <p
                      className={`${
                        game?.gameDetails?.gameStatus == "Completed"
                          ? "text-green-600"
                          : "text-red-600"
                      } text-sm `}
                    >
                      InCompleted
                    </p>
                  </div>
                  <p>
                    <span className="font-bold">Time Taken: </span>
                    {formatDiffOfStartAndEndTime(
                      game?.gameDetails?.gameStartTime,
                      game?.gameDetails?.gameEndTime
                    )}
                  </p>
                  <p>
                    <span className="font-bold">Score: </span>
                    {game?.gameDetails?.gameScore}
                  </p>
                </div>
              ))}
              {!isLoading &&
              CompletedGames?.length > 5 &&
              pageindex.Completed < CompletedGames?.length ? (
                <div className="w-full mt-5 flex justify-center ">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4   " onClick={showMoreCompleted} >
                    Show More
                  </button>
                </div>
              ) : null}
            </div>

            {isDataLoading ? (
              <div className="flex justify-center items-center pt-10 pb-10 ">
                <div className="w-12 h-12 border-2  rounded-full animate-spin loader border-blue-300">
                  {" "}
                </div>
              </div>
            ) : null}

            {/* No Completed games  */}
            {!isDataLoading && CompletedGames.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-gray-500 mb-5">No Completed Games</p>

                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={startGame}
                >
                  Play
                </button>
              </div>
            ) : null}
          </div>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-xl font-bold mb-4">User Charts</h1>
            {CompletedGames.length? <UserCharts CompletedGames = {CompletedGames} ProgressGames ={InProgressGames}/> : <p className="text-gray-500">No Data</p>}
          </div>
          {/* Leaderboard */}
          <div
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            style={{
              background: "rgba( 248, 250, 251, 0.9)",
              boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
              backdropFilter: "blur( 12.5px )",
              WebkitBackdropFilter: " blur( 12.5px )",
              borderRadius: "10px",
              border: "1px solid rgba( 255, 255, 255, 0.18 )",
            }}
          >
            <Leaderboard data={allLeaderboardData}/>
          </div>
        </div>
      </div>
      {/* Loader  */}
      {isLoading ? (
        <div className="h-full w-full absolute top-0 right-0">
          <div className="h-full w-full bg-gray-900 opacity-50 absolute top-0 right-0 loaderAnimate"></div>
          <div className="h-full w-full absolute top-0 right-0 flex justify-center items-center text-white">
            Creating Game...
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 ml-2"></div>
          </div>
        </div>
      ) : null}
    </Userlayout>
  );
}

export default UserDashboard;
