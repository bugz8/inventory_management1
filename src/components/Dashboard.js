import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    // Replace 'your-backend-endpoint-for-inventory' with the actual URL
    fetch('/api/inventory')
        .then((response) => response.json())
        .then((data) => {
          // Assuming data is an array of inventory items
          setInventoryData(data);
    })
    .catch((error) => {
      console.error('Error fetching inventory data:', error);
    });
  }, []);

  return (
    <div className="container my-4 text-center">
      <h2>Dashboard</h2>
      <br></br>
      <table className="table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity In</th>
            <th>Quantity Out</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantityIn}</td>
              <td>{item.quantityOut}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;