import React from 'react';

function UserLeaderboard() {
  // TODO: fetch user data from API and sort by score
  const users = [
    { id: 1, name: 'Alice', score: 100 },
    { id: 2, name: 'Bob', score: 80 },
    { id: 3, name: 'Charlie', score: 60 },
    { id: 4, name: 'David', score: 40 },
    { id: 5, name: 'Emily', score: 20 },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">User Leaderboard</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="py-2">Rank</th>
            <th className="py-2">Name</th>
            <th className="py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td className="py-2">{index + 1}</td>
              <td className="py-2">{user.name}</td>
              <td className="py-2">{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserLeaderboard;
