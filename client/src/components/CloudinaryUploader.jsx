import React, { useState } from "react";
import axios from "axios";

const CloudinaryUploader = ({ onUploadComplete, uploadPreset, cloudName, folderPath }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState([]);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    setIsUploading(true);

    try {
      const urls = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", uploadPreset);

          if (folderPath) {
            formData.append("folder", folderPath); // Use the folderPath prop dynamically
          }

          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData
          );
          return response.data.secure_url;
        })
      );

      setUploadedUrls((prev) => [...prev, ...urls]);
      onUploadComplete(urls); // Notify parent with the URLs
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input type="file" multiple accept="image/*" onChange={handleFileUpload} />
      {isUploading && <p>Uploading images...</p>}
      <div className="previews">
        {uploadedUrls.map((url, index) => (
          <img key={index} src={url} alt={`Uploaded ${index}`} className="preview-image" />
        ))}
      </div>
    </div>
  );
};

export default CloudinaryUploader;

