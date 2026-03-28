import { useState } from "react";
import FileUpload from "../components/FileUpload";
import TextAreaBox from "../components/TextAreaBox";
import "../styles/interview.form.scss";

const InterviewForm = () => {
  const [file, setFile] = useState(null);
  const [selfDesc, setSelfDesc] = useState("");
  const [jobDesc, setJobDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      file,
      selfDescription: selfDesc.trim(),
      jobDescription: jobDesc.trim(),
    };

    console.log("FORM DATA:", payload);
  };

  return (
    <main className="interview-page">
      <div className="interview-container">
        <header className="interview-header">
          <h1>Interview Report</h1>
          <p>Upload your resume and job description</p>
        </header>

        <form
          className="interview-form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <FileUpload file={file} setFile={setFile} />

          <div className="form-grid">
            <TextAreaBox
              label="Your Description"
              name="selfDescription"
              placeholder="Write about yourself..."
              value={selfDesc}
              onChange={setSelfDesc}
            />

            <TextAreaBox
              label="Job Description"
              name="jobDescription"
              placeholder="Paste job description..."
              value={jobDesc}
              onChange={setJobDesc}
            />
          </div>

          <button className="button submit-btn">Generate Report</button>
        </form>
      </div>
    </main>
  );
};

export default InterviewForm;
