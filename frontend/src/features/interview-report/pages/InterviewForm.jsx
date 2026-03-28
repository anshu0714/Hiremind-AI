import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "../components/FileUpload";
import TextAreaBox from "../components/TextAreaBox";
import { generateInterviewReport } from "../services/interview.api";
import { showToast } from "@/utils/toast.util";
import "../styles/interview.form.scss";
import { logger } from "@/utils/logger.util";

const InterviewForm = () => {
  const [file, setFile] = useState(null);
  const [selfDesc, setSelfDesc] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jobDesc.trim()) {
      showToast.error("Job description is required");
      return;
    }

    if (file && file.type !== "application/pdf") {
      showToast.error("Only PDF allowed");
      return;
    }

    let toastId;

    try {
      setLoading(true);

      const formData = new FormData();

      if (file) formData.append("resume", file);
      if (selfDesc.trim()) formData.append("selfDescription", selfDesc.trim());

      formData.append("jobDescription", jobDesc.trim());

      toastId = showToast.loading("Generating report...");

      const res = await generateInterviewReport(formData);

      showToast.dismiss(toastId);

      if (!res) throw new Error("Failed to generate report");

      showToast.success("Report generated 🚀");

      navigate(`/interview-report/${res.data._id}`);
    } catch (err) {
      logger.error("GENERATE_REPORT_ERROR", err.message);
      showToast.dismiss(toastId);
    } finally {
      setLoading(false);
    }
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

          <button className="button submit-btn" disabled={loading}>
            {loading ? "Generating..." : "Generate Report"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default InterviewForm;
