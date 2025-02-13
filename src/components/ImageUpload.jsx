import { useState, useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { AppContext } from '../AppProvider';
import axios from "axios";

const ImageUpload = () => {
  const { setImageUrl } = useContext(AppContext);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const onDrop = useCallback(async (acceptedFiles) => {
    if (!acceptedFiles.length) return;

    const file = acceptedFiles[0];

    if (!file.type.startsWith("image/")) {
      setError("Abeg upload a valid image file.");
      return;
    }

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dllx7afbs/image/upload",
        formData
      );

      setImageUrl(response.data.secure_url);
      localStorage.setItem("imageUrl", response.data.secure_url);
      setUploading(false);
    } catch (error) {
      console.error("Upload failed:", error);
      setError("Upload failed. Please try again.");
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  return (
    <div className="upload-container">
      <div {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""}`}>
        <input {...getInputProps()} />
        <div className="upload-content">
          <img src="/upload_icon.svg" alt="upload icon" />
          <p>{uploading ? "Uploading..." : "Drag & drop or click to upload"}</p>
        </div>
      </div>
      {error && <p className="error roboto">{error}</p>}
    </div>
  );
};

export default ImageUpload;