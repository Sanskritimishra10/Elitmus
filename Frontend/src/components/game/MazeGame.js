import React, { useState, useEffect } from "react";
import clsx from "clsx";

const MazeGame = () => {
  const [maze, setMaze] = useState([]);
  const [currentPosition, setCurrentPosition] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const mazeWidth = 15;
  const mazeHeight = 15;

  const generateMaze = () => {
    const maze = [];
    for (let y = 0; y < mazeHeight; y++) {
        const row = [];
        for (let x = 0; x < mazeWidth; x++) {
            row.push(0);
        }
        maze.push(row);
    }
    return maze;
    };


  // Generate the maze using the algorithm of your choice
  useEffect(() => {
    
    setMaze(generateMaze());
  }, []);

  // Handle keyboard input to move the player
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isGameOver) {
        const x = currentPosition[0];
        const y = currentPosition[1];
        let newPosX = x;
        let newPosY = y;

        switch (event.key) {
          case "ArrowUp":
            newPosY = Math.max(0, y - 1);
            break;
          case "ArrowDown":
            newPosY = Math.min(mazeHeight - 1, y + 1);
            break;
          case "ArrowLeft":
            newPosX = Math.max(0, x - 1);
            break;
          case "ArrowRight":
            newPosX = Math.min(mazeWidth - 1, x + 1);
            break;
          default:
            break;
        }

        if (maze[newPosY][newPosX] === 0) {
          setCurrentPosition([newPosX, newPosY]);
        }

        if (newPosX === mazeWidth - 1 && newPosY === mazeHeight - 1) {
          setIsGameOver(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPosition, maze, isGameOver]);

  // Render the maze and player
  const renderMaze = () => {
    return maze.map((row, y) =>
      row.map((cell, x) => {
        const isPlayer = currentPosition[0] === x && currentPosition[1] === y;
        const classes = clsx(
          "block",
          "w-5",
          "h-5",
          "border",
          "border-black",
          "bg-white",
          { "bg-black": cell === 1, "bg-blue-500": isPlayer }
        );
        return <div key={`${x}-${y}`} className={classes} />;
      })
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">Maze Game</h1>
      {isGameOver ? (
        <div>
          <p className="text-2xl font-bold mb-4">Congratulations! You won!</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => window.location.reload()}
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-15 gap-0">{renderMaze()}</div>
      )}
    </div>
  );
};

export default MazeGame;
