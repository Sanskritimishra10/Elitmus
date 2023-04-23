import React from 'react'

const leaderboardData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', score: 100 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', score: 75 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', score: 50 },
  { id: 4, name: 'Sarah Lee', email: 'sarah@example.com', score: 45 },
  { id: 5, name: 'David Kim', email: 'david@example.com', score: 40 },
  // Add more users here
]

const Leaderboard = ({data}) => {
  return (
    <div className="flex flex-col items-center justify-center  pb-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Leaderboard</h1>
      <table className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 uppercase text-sm text-gray-600">
          <tr>
            <th className="py-3 px-4 text-left">#</th>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Score</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {data.map((user, index) => (
            <tr key={user._id} className={`${index === 0 ? 'bg-yellow-200' : index === 1 ? 'bg-yellow-100' : index === 2 ? 'bg-yellow-50' : ''}`}>
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">{user.name}</td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4">{user.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Leaderboard
