import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { QrReader } from 'react-qr-reader';

const RePrint = () => {
    const [itemId, setItemId] = useState('');
    const [qrCodeData, setQrCodeData] = useState(null);
    const [scanError, setScanError] = useState(null);

    const handleIdSubmit = (e) => {
        e.preventDefault();
        generateQRCode(itemId);
    };

    const handleScanQRCode = (data) => {
        if (data) {
            setQrCodeData(data);
            setScanError(null);
        } else {
            setScanError('No QR code found. Please try again.');
        }
    };

    const handleError = (err) => {
        console.error('QR code scan error:', err);
        setScanError('Error scanning QR code. Please try again.');
    };

    const generateQRCode = async (data) => {
        try {
          // Send a POST request to the server to generate the QR code
          const response = await axios.post('/api/generateQRCode', { itemId: data });
          // Assuming the server returns the generated QR code data
          const generatedQRCode = response.data.qrCodeData;
          setQrCodeData(generatedQRCode);
        } catch (error) {
          console.error('Error generating QR code:', error);
          setQrCodeData(null);
          setScanError('Error generating QR code. Please try again.');
        }
      };

    return (
        <div className="container my-4">
            <div className='text-center'>
                <h2>Reprint</h2>
            </div>
            <br></br>
            <form onSubmit={handleIdSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <input
                            type="text"
                            value={itemId}
                            onChange={(e) => setItemId(e.target.value)}
                            className="form-control"
                            placeholder="Enter Item ID"
                            required
                        />
                    </div>
                    <div className="col-md-3 mb-3">
                        <button type="submit" className="btn btn-primary">Print by ID</button>
                    </div>
                    <div className="col-md-3 mb-3">
                        {/* Scan QR Code */}
                        <QrReader
                            delay={300}
                            onError={handleError}
                            onScan={handleScanQRCode}
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>
            </form>

            {qrCodeData && (
                <div className="text-center">
                    <h4>Printable Letter</h4>
                    <QRCode value={qrCodeData} />
                    <p>Item ID: {itemId}</p>
                    {/* Include other details like coat */}
                </div>
            )}

            {scanError && (
                <div className="alert alert-danger" role="alert">
                    {scanError}
                </div>
            )}
        </div>
    );
};

export default RePrint;