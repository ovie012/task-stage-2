import { useState, useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { AppContext } from '../AppProvider';
import axios from "axios";

const ApiKey = import.meta.env.VITE_API_KEY;
const ApiPresent = import.meta.env.VITE_API_PRESENT;
const ApiName = import.meta.env.VITE_API_NAME

const ImageUpload = () => {
  const { setImageUrl, imageUrl, uploaded, setUploaded, imageError, setImageError } = useContext(AppContext);

  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    if (!acceptedFiles.length) return;

    const file = acceptedFiles[0];

    if (!file.type.startsWith("image/")) {
      setImageError("Abeg upload a valid image file.");
      return;
    }

    setUploading(true);
    setImageError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Legend_upload");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dllx7afbs/image/upload`,
        formData
      );

      setImageUrl(response.data.secure_url);
      localStorage.setItem("imageUrl", response.data.secure_url);
      setUploading(false);
      setUploaded(true);
    } catch (error) {
      console.error("Upload failed:", error);
      setImageError("Upload failed. Please try again.");
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  console.log(ApiKey, ApiPresent)

  return (
    <div className="upload-container">
      <div {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""}`}>
        <input {...getInputProps()} />
          {uploaded ? 
            <img className="uploaded" src={imageUrl} alt="avatar" />
          :
            <>
              <div className="upload-content">
                <img src="/upload_icon.svg" alt="upload icon" />
                <p>{uploading ? "Uploading..." : "Drag & drop or click to upload"}</p>
              </div>
            </>
          }
      </div>
      {imageError && <p className="error roboto">{imageError}</p>}
    </div>
  );
};

export default ImageUpload;