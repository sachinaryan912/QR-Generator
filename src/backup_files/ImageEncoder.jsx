import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import './ImageEncoder.css';

const ImageEncoder = () => {
  const [base64Image, setBase64Image] = useState('');
  const [compressedSize, setCompressedSize] = useState(0);
  const [originalSize, setOriginalSize] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      setOriginalSize((file.size / 1024).toFixed(2));

      const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        setCompressedSize((compressedFile.size / 1024).toFixed(2));

        const reader = new FileReader();
        reader.onloadend = () => {
          setBase64Image(reader.result);
          setShowPreview(false);
          console.log('Compressed base64:', reader.result);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error('Compression error:', error);
      }
    }
  };

  return (
    <div className="image-encoder">
      <h2>Image Upload with Real Compression</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {base64Image && (
        <div className="actions">
          <p>Original Size: {originalSize} KB</p>
          <p>Compressed Size: {compressedSize} KB</p>
          <button onClick={() => setShowPreview(true)}>Show Preview</button>
        </div>
      )}

      {showPreview && base64Image && (
        <div className="preview">
          <h3>Image Preview:</h3>
          <img src={base64Image} alt="Compressed Preview" />
        </div>
      )}
    </div>
  );
};

export default ImageEncoder;
