import { useState } from "react";

const PuzzlePage = () => {
  const [scrambledWord, setScrambledWord] = useState("PUZZLE");
  const [guess, setGuess] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleGuess = (event) => {
    event.preventDefault();
    if (guess.toUpperCase() === "PUZZLE") {
      setShowMessage(true);
      // Navigate to the next clue or page here
    }
  };
  const unscrambleWord = (word) => {
    const shuffledWord = word
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
    return shuffledWord;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center">Third Clue Puzzle</h1>
      <div className="mt-6">
        <p className="mb-4 text-center">
          Unscramble the letters below to form a word that will give you a clue
          about where to find the next clue:
        </p>
        <p className="mb-4 text-center text-4xl font-bold">EPZLUZ</p>
        <form
          onSubmit={handleGuess}
          className="flex   flex-col md:flex-row  justify-center items-center"
        >
          <input
            type="text"
            className={`'w-72 py-2 px-3 rounded  focus:outline-none', {
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
          {showMessage && guess.toUpperCase() !== "PUZZLE" && (
            <p className="mt-2 text-sm text-red-500">
              Incorrect guess. Please try again.
            </p>
          )}
            <button
              type="submit"
              className=" ml-3 mt-2 md:mt-0 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none"
            >
              Submit
            </button>
        </form>
      </div>
    </div>
  );
};

export default PuzzlePage;
