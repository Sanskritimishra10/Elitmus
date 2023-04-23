import React from "react";

const TotalScore = ({ score }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-100">
        <div className="max-w-md mx-auto p-2 bg-white shadow-lg rounded-lg">
          <div className="flex justify-center items-center">
            <div className="text-md font-bold text-gray-700">Total Score</div>
          </div>
          <div className="flex justify-center items-center">
            <div className="text-sm font-bold text-gray-700">{score}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalScore;
