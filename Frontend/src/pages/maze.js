import React, { useState } from 'react';
import clsx from 'clsx';

const FirstCluePage = () => {
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // check if the answer is correct
    if (inputValue.toLowerCase() === 'answer') {
      setIsAnswerCorrect(true);
    } else {
      setInputValue('');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {!isAnswerCorrect ? (
        <div className="max-w-lg px-6 py-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">The First Clue</h2>
          <p className="text-gray-600 text-base mb-6">
            I am not alive, but I grow;
            I don`&apos;`t have lungs, but I need air;
            I don`&apos;`t have a mouth, but water kills me. What am I?
          </p>
          <form onSubmit={handleFormSubmit} className="flex flex-col">
            <label htmlFor="answer" className="mb-2 font-bold text-gray-800">Answer:</label>
            <input
              type="text"
              id="answer"
              value={inputValue}
              onChange={handleInputChange}
              className={clsx(
                "w-full px-4 py-2 border rounded-md",
                {"border-red-500": inputValue && !isAnswerCorrect}
              )}
            />
            {inputValue && !isAnswerCorrect && (
              <p className="text-red-500 text-sm mt-1">Incorrect answer. Please try again.</p>
            )}
            <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="max-w-lg px-6 py-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Congratulations!</h2>
          <p className="text-gray-600 text-base mb-6">
            You have found the correct answer! The next clue awaits you at the base of the big oak tree.
          </p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Go to the next clue
          </button>
        </div>
      )}
    </div>
  );
};

export default FirstCluePage;
