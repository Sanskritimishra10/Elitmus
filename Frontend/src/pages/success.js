import Link from 'next/link'
import React from 'react'

const succuss = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-500">
      <h1 className="text-4xl font-bold text-white mb-4">Congratulations!</h1>
      <p className="text-2xl text-white mb-8">You have completed the game!</p>
      <Link href="/">
      <button className="px-8 py-4 bg-white text-green-500 font-bold rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400">
        Go to Home
      </button>
      </Link>
    </div>
  )
}

export default succuss
