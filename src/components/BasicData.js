import React from 'react';
import axios from 'axios';

const BasicData = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        // General form submission logic
    };

    const handleNameSubmit = async (e) => {
        e.preventDefault();
        // Name submission logic
    };

    const handleWidthSubmit = async (e) => {
        e.preventDefault();
        // Width submission logic
    };

    const handleThicknessSubmit = async (e) => {
        e.preventDefault();
        // Thickness submission logic
    };

    const handleSupplierSubmit = async (e) => {
        e.preventDefault();
        // Supplier submission logic
    };

    const handleCoatSubmit = async (e) => {
        e.preventDefault();
        // Coat submission logic
    };

    const handleConditionSubmit = async (e) => {
        e.preventDefault();
        // Condition submission logic
    };

    return (
        <div className="container my-4">
            <div className="row justify-content-center">
                <div className="col-md-6 text-center">
                    <h2>Basic Data</h2>
                </div>
            </div>
            <br></br>
            <br></br>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    {/* Name */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input type="text" id="name" name="name" className="form-control" required />
                        <button type="submit" className="btn btn-primary mt-2" onClick={handleNameSubmit}>Submit Name</button>
                    </div>
                    {/* Width */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="width" className="form-label">Width:</label>
                        <input type="number" id="width" name="width" className="form-control" required />
                        <button type="submit" className="btn btn-primary mt-2" onClick={handleWidthSubmit}>Submit Width</button>
                    </div>
                </div>
            </form>
            <br></br>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    {/* Thickness */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="thickness" className="form-label">Thickness:</label>
                        <input type="number" id="thickness" name="thickness" className="form-control" required />
                        <button type="submit" className="btn btn-primary mt-2" onClick={handleThicknessSubmit}>Submit Thickness</button>
                    </div>
                    {/* Supplier */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="supplier" className="form-label">Supplier:</label>
                        <input type="text" id="supplier" name="supplier" className="form-control" required />
                        <button type="submit" className="btn btn-primary mt-2" onClick={handleSupplierSubmit}>Submit Supplier</button>
                    </div>
                </div>
            </form>

            <form onSubmit={handleSubmit}>
            <br></br>
                <div className="row">
                    {/* Coat */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="coat" className="form-label">Coat:</label>
                        <select id="coat" name="coat" className="form-control" required>
                            <option value="coat1">Coat 1</option>
                            <option value="coat2">Coat 2</option>
                        </select>
                        <button type="submit" className="btn btn-primary mt-2" onClick={handleCoatSubmit}>Submit Coat</button>
                    </div>
                    {/* Condition */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="condition" className="form-label">Condition:</label>
                        <select id="condition" name="condition" className="form-control" required>
                            <option value="condition1">Condition 1</option>
                            <option value="condition2">Condition 2</option>
                        </select>
                        <button type="submit" className="btn btn-primary mt-2" onClick={handleConditionSubmit}>Submit Condition</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BasicData;
