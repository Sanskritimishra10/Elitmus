import React from 'react';

function UserAnalytics() {
  // TODO: fetch user analytics data from API
  const userAnalyticsData = [
    { id: 1, name: 'Alice', timeTaken: 10, solutionAccuracy: 90 },
    { id: 2, name: 'Bob', timeTaken: 20, solutionAccuracy: 80 },
    { id: 3, name: 'Charlie', timeTaken: 30, solutionAccuracy: 70 },
    { id: 4, name: 'David', timeTaken: 40, solutionAccuracy: 60 },
    { id: 5, name: 'Emily', timeTaken: 50, solutionAccuracy: 50 },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">User Analytics</h2>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">User ID</th>
            <th className="px-4 py-2">User Name</th>
            <th className="px-4 py-2">Time Taken (min)</th>
            <th className="px-4 py-2">Solution Accuracy (%)</th>
          </tr>
        </thead>
        <tbody>
          {userAnalyticsData.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.timeTaken}</td>
              <td className="border px-4 py-2">{user.solutionAccuracy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserAnalytics;
