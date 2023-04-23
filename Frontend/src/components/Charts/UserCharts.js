import React, { useState } from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
export const testData = [
  {
    id: 1,
    user: "Om Prakash",
    timeTaken: 15900,
    score: 4000,
    gameStatus: "Completed",
  },
  {
    id: 2,
    user: "Prakash",
    timeTaken: 47600,
    score: 40001,
    gameStatus: "In Progress",
  },
  {
    id: 3,
    user: "Guest",
    timeTaken: 22900,
    score: 40010,
    gameStatus: "Not Completed",
  },
  {
    id: 4,
    user: "Guest2",
    timeTaken: 51900,
    score: 200,
    gameStatus: "Completed",
  },
  {
    id: 5,
    user: "Guest3",
    timeTaken: 30900,
    score: 5000,
    gameStatus: "Completed",
  },
];

const UserCharts = ({ CompletedGames, ProgressGames }) => {
  const [userData, setUserData] = useState({
    labels: testData.map((data) => data.user),
    datasets: [
      {
        label: "timeTaken",
        data: testData.map((data) => data.timeTaken),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
      {
        label: "Score",
        data: testData.map((data) => data.score),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const returnMinutes = (startTime, endTime) => {
    let time1 = new Date(startTime);
    let time2 = new Date(endTime);
    let difference = time2.getTime() - time1.getTime();
    let resultInMinutes = Math.round(difference / 60000);
    console.log(resultInMinutes, " :- ", startTime, " :- ", endTime);

    return resultInMinutes;
  };

  const [GameStatusData, SetGameStatusData] = useState({
    labels: ["Completed", "In Progress"],
    datasets: [
      {
        label: "Total",
        data: [CompletedGames.length, ProgressGames.length],
        backgroundColor: [
          "#99D28B",
          "rgb(255, 205, 86)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  });

  // Score vs Time taken
  const [ScoreTimeData, setScoreTimeData] = useState({
    labels: CompletedGames.slice(0,5).map((data, index) => "Game " + (index + 1)),
    datasets: [
      {
        label: "Score",
        data: CompletedGames.map((data) => data.gameDetails.gameScore),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
      {
        label: "timeTaken",
        data: CompletedGames.slice(0,5).map((data) =>
          returnMinutes(
            data?.gameDetails?.gameStartTime,
            data?.gameDetails?.gameEndTime
          )
        ),
        backgroundColor: [
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  });

  // Score vs Time taken
  const [ScoreData, setScoreData] = useState({
    labels: CompletedGames.map((data, index) => "Game" + index + 1),
    datasets: [
      {
        label: "Score",
        data: CompletedGames.map((data) => data.gameDetails.gameScore),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  });
  return (
    <div className=" md:flex md:flex-wrap md:justify-between ">
      <div className=" mb-10 mr-5 ml-5  ">
        <h1 className=" text-md mb-4 ">Completed Games Vs In Progress game</h1>
        {CompletedGames.length > 0 && <PieChart chartData={GameStatusData} />}
      </div>
      <div>
        <h1 className=" text-md mb-4 ">Time Vs Score</h1>
        <BarChart chartData={ScoreTimeData} />
      </div>
      <div>
        <h1 className=" text-md mb-4 ">Score Analysis</h1>

        <LineChart chartData={ScoreData} />
      </div>
    </div>
  );
};

export default UserCharts;
