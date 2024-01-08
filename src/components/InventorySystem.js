import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';

const generateBarcode = () => {
    const barcode = Math.random().toString(36).substring(2, 12);
    return barcode;
};

const InventorySystem = () => {
    const [formData, setFormData] = useState({
        name: '',
        width: '',
        thickness: '',
        supplier: '',
        coat: '',
        condition: '',
        weight: '',
        pricing: '',
        barcode: generateBarcode(),
    });

    const [inventory, setInventory] = useState([]);
    const [nameOptions, setNameOptions] = useState([]);
    const [widthOptions, setWidthOptions] = useState([]);
    const [thicknessOptions, setThicknessOptions] = useState([]);
    const [supplierOptions, setSupplierOptions] = useState([]);
    const [coatOptions, setCoatOptions] = useState([]);
    const [conditionOptions, setConditionOptions] = useState([]);

    useEffect(() => {
        // Fetch dropdown options from the server
        const fetchDropdownOptions = async (fieldName, setOptions) => {
            try {
                const response = await axios.get(`/api/${fieldName}/options`);
                const options = response.data;
                setOptions(options);
            } catch (error) {
                console.error(`Error fetching ${fieldName} options:`, error);
            }
        };

        // Call the fetch function for each dropdown
        fetchDropdownOptions('name', setNameOptions);
        fetchDropdownOptions('width', setWidthOptions);
        fetchDropdownOptions('thickness', setThicknessOptions);
        fetchDropdownOptions('supplier', setSupplierOptions);
        fetchDropdownOptions('coat', setCoatOptions);
        fetchDropdownOptions('condition', setConditionOptions);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const itemData = {
            ...formData,
            barcode: formData.barcode,
        };

        try {
            // Add item to inventory
            const inventoryResponse = await axios.post('/api/inventory', itemData);
            const newItem = inventoryResponse.data;

            // Update state and local storage for inventory
            const updatedInventory = [...inventory, newItem];
            setInventory(updatedInventory);
            localStorage.setItem('inventory', JSON.stringify(updatedInventory));

            // Reset the form data and generate a new barcode
            setFormData({
                name: '',
                width: '',
                thickness: '',
                supplier: '',
                coat: '',
                condition: '',
                weight: '',
                pricing: '',
                barcode: generateBarcode(),
            });
        } catch (error) {
            console.error('Error adding item to inventory:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Inventory System</h2>
            <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                    {/* First Column */}
                    <div className="mb-3">
                        <select
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-select"
                            required
                        >
                            <option value="">Select Name</option>
                            {nameOptions.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Second Column */}
                    <div className="mb-3">
                        <select
                            name="width"
                            value={formData.width}
                            onChange={handleChange}
                            className="form-select"
                            required
                        >
                            <option value="">Select Width</option>
                            {widthOptions.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.width}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <select
                            name="thickness"
                            value={formData.thickness}
                            onChange={handleChange}
                            className="form-select"
                            required
                        >
                            <option value="">Select Thickness</option>
                            {thicknessOptions.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.thickness}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <select
                            name="supplier"
                            value={formData.supplier}
                            onChange={handleChange}
                            className="form-select"
                            required
                        >
                            <option value="">Select Supplier</option>
                            {supplierOptions.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.supplier}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <select
                            name="coat"
                            value={formData.coat}
                            onChange={handleChange}
                            className="form-select"
                            required
                        >
                            <option value="">Select Coat</option>
                            {coatOptions.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.coat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <select
                            name="condition"
                            value={formData.condition}
                            onChange={handleChange}
                            className="form-select"
                            required
                        >
                            <option value="">Select Condition</option>
                            {conditionOptions.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.condition}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    {/* Third Column */}
                    <div className="mb-3">
                        <input
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Weight"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="number"
                            name="pricing"
                            value={formData.pricing}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Price"
                            required
                        />
                    </div>
                </div>
                <div className="col-12 text-center">
                    {/* Submit button */}
                    <button type="submit" className="btn btn-primary">Add Item</button>
                </div>
            </form>
            <br></br>
            <div className="text-center">
                <QRCode value={formData.barcode} />
            </div>
        </div>
    );
};

export default InventorySystem;