import { Router, useRouter } from 'next/router';
import React from 'react';
// import logo from './logo.svg';
// import './App.css';

function App() {
    const Route = useRouter()
    const playNow = () => {
        Route.push('/firstclue');
    }

  return (
    <div className="bg-gray-200 h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center">
          {/* <img src={logo} alt="The Hidden Code" className="w-16 h-16 mr-2" /> */}
          <h1 className="text-2xl font-bold">The Hidden Code</h1>
        </div>
        <p className="mt-4">
          Welcome to The Hidden Code, a game of logic and deduction! Your goal is to figure out the secret code by making guesses and receiving feedback on each guess.
        </p>
        <h2 className="mt-6 text-lg font-bold">How to Play</h2>
        <ol className="list-decimal list-inside mt-4">
          <li>Choose the number of digits in the secret code. You can choose between 3 and 6 digits.</li>
          <li>Make a guess by entering a combination of digits.</li>
          <li>Receive feedback on your guess. A + means that a digit is correct and in the correct position, a - means that a digit is correct but in the wrong position, and a X means that a digit is incorrect.</li>
          <li>Make another guess based on the feedback until you correctly guess the code.</li>
          <li>You win!</li>
        </ol>
        <div className="mt-6 flex justify-center  ">
            <button onClick={playNow}>
          <a href="#" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Play Now
          </a></button>
        </div>
      </div>
    </div>
  );
}

export default App;
