import React, { useState, useEffect } from 'react';

const SQFeetCalc = () => {
  const [inchInputs, setInchInputs] = useState([]);
  const [width, setWidth] = useState('');
  const [result, setResult] = useState([]);
  const [totals, setTotals] = useState({ quantity: 0, inch: 0, squareFeet: 0 });

  useEffect(() => {
    calculateResult(inchInputs);
  }, [inchInputs]);

  const handleSubmit = async () => {
    try {
      const requestData = {
        inchInputs: inchInputs,
        width: width,
      };

      const response = await axios.post('/api/calculator', {
        ...requestData,
      });

      const data = response.data;
      setResult(data.result);
      setTotals(data.totals);

      // Print logic
      window.print();
    } catch (error) {
      console.error('Error calculating SQFeet:', error);
    }
  };

  const handleAddInch = () => {
    const quantity = parseInt(prompt('Enter quantity'));
    const inchValue = parseFloat(prompt('Enter inch value'));
    const newInchInputs = [...inchInputs, { inch: inchValue, quantity }];
    setInchInputs(newInchInputs);
  };

  const calculateResult = (inputs) => {
    const calculatedResult = inputs.map((input) => {
      const inchToFeet = Math.ceil(input.inch); // Convert inches to feet and round up
      const total = inchToFeet * width * input.quantity; // Multiply by width and quantity
      return { inch: input.inch, quantity: input.quantity, squareFeet: total };
    });

    setResult(calculatedResult);

    const totals = calculatedResult.reduce(
      (acc, val) => {
        acc.quantity += val.quantity;
        acc.inch += val.inch;
        acc.squareFeet += val.squareFeet;
        return acc;
      },
      { quantity: 0, inch: 0, squareFeet: 0 }
    );

    setTotals(totals);
  };

  const renderResults = () => {
    return (
      <div className="col-md-6">
        <table className="table text-center">
          <thead>
            <tr>
              <th>Quantity</th>
              <th>Length (inch)</th>
              <th>Square feet</th>
            </tr>
          </thead>
          <tbody>
            {result.map((res, index) => (
              <tr key={index}>
                <td>{res.quantity}</td>
                <td>{res.inch}</td>
                <td>{res.squareFeet}</td>
              </tr>
            ))}
            <tr>
              <td><strong>{totals.quantity}</strong></td>
              <td><strong>{totals.inch}</strong></td>
              <td><strong>{totals.squareFeet}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="container my-4">
      <h2 className='text-center'>Square Feet Calculator</h2>
      <br></br>
      <div className="row">
        <div className="col-md-6">
          <div className='col-12'>
            <div className="mb-3">
              <label htmlFor="width" className="form-label">Width:</label>
              <input
                type="number"
                id="width"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="form-control col-3"
              />
            </div>
          </div>
          <div>
          <button onClick={handleAddInch} className="btn btn-primary mb-3">Add Length</button>
          </div>
          {/* <div>
          <button onClick={handleSubmit} className="btn btn-success mb-3">Print</button>
          </div> */}
        </div>
        {renderResults()}
      </div>
    </div>
  );
};

export default SQFeetCalc;