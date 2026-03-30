import { useRef, useState } from "react";

const FileUpload = ({ file, setFile }) => {
  const inputRef = useRef();
  const [isDragging, setIsDragging] = useState(false);

  const id = "resume";

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) setFile(selected);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    }
  };

  return (
    <div
      className={`upload-box ${isDragging ? "dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current.click()}
    >
      <p>
        <strong>Upload Resume</strong>
      </p>
      <p>Drag & drop PDF or click</p>

      <input
        id={id}
        name="resume"
        ref={inputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        hidden
      />

      <div className="file-name">{file ? file.name : "No file selected"}</div>
    </div>
  );
};

export default FileUpload;
