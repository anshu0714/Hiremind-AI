import { useRef } from "react";

const FileUpload = ({ file, setFile }) => {
  const inputRef = useRef();
  const id = "resume";

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) setFile(selected);
  };

  return (
    <div className="upload-box">
      <label htmlFor={id}>
        <p>
          <strong>Upload Resume</strong>
        </p>
        <p>Drag & drop PDF or click</p>
      </label>

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
