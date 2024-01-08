import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { QrReader } from 'react-qr-reader';

const BarcodeGenerator = () => {
  const generateQRCode = () => {
    const qrCodeValue = Math.random().toString(36).substring(2, 12);
    return qrCodeValue;
  };

  const printQRCode = (qrCodeValue) => {
    console.log(`Printing QR code: ${qrCodeValue}`);
    // Include specific code to print the QR code
  };

  const [scannedQRCode, setScannedQRCode] = useState(null);
  const [scanError, setScanError] = useState(null);

  const handleScanQRCode = (data) => {
    if (data) {
      setScannedQRCode(data);
      setScanError(null);
    } else {
      setScanError('No QR code found. Please try again.');
    }
  };

  const handleError = (err) => {
    console.error('QR code scan error:', err);
    setScanError('Error scanning QR code. Please try again.');
  };

  const scanQRCode = () => {
    // Logic to scan the QR code
    // This function is already handled by the QrReader component
  };

  const qrCodeValue = generateQRCode();

  return (
    <div>
      <QRCode value={qrCodeValue} />
      <button onClick={() => printQRCode(qrCodeValue)}>Print QR Code</button>
      <button onClick={scanQRCode}>Scan QR Code</button>

      {/* QR Code Scanner */}
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScanQRCode}
        style={{ width: '100%' }}
      />

      {scannedQRCode && (
        <div>
          <h4>Scanned QR Code Data</h4>
          <p>{scannedQRCode}</p>
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

export default BarcodeGenerator;