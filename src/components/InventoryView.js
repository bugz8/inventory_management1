import React, { useState, useEffect } from 'react';

const InventoryView = () => {
    const [inventoryData, setInventoryData] = useState([]);

    useEffect(() => {
        // Fetch inventory data from an API or database and set it to inventoryData state
        // Replace this with actual fetching logic
        const fetchData = async () => {
            try {
                // Example fetching logic using fetch API (replace this with your actual fetch method)
                const response = await fetch('http://api.example.com/inventory');
                const data = await response.json();
                setInventoryData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container my-4 text-center">
            <h2>Inventory View</h2>
            <br></br>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Width</th>
                        <th>Thickness</th>
                        <th>Coat</th>
                        <th>Supplier</th>
                        <th>Condition</th>
                        <th>Weight</th>
                        <th>Price</th>
                        <th>User</th>
                    </tr>
                </thead>
                <tbody>
                    {inventoryData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.width}</td>
                            <td>{item.thickness}</td>
                            <td>{item.coat}</td>
                            <td>{item.supplier}</td>
                            <td>{item.condition}</td>
                            <td>{item.wight}</td>
                            <td>{item.price}</td>
                            <td>{item.user}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryView;