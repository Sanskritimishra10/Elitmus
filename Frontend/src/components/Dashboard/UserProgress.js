import React from 'react';

function UserProgress() {
  // TODO: fetch user progress data from API
  const userProgress = [
    { id: 1, name: 'Alice', level: 10, xp: 500 },
    { id: 2, name: 'Bob', level: 8, xp: 350 },
    { id: 3, name: 'Charlie', level: 5, xp: 200 },
    { id: 4, name: 'David', level: 3, xp: 100 },
    { id: 5, name: 'Emily', level: 1, xp: 50 },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">User Progress</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {userProgress.map(user => (
          <div key={user.id} className="bg-gray-200 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2">{user.name}</h3>
            <p>Level {user.level}</p>
            <p>XP {user.xp}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProgress;
