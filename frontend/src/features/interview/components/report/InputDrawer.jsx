const InputDrawer = ({ open, onClose, inputs }) => {
  if (!inputs) return null;

  const { resume, jd, self } = inputs;

  const hasValue = (val) => val && val.trim() !== "";

  return (
    <>
      {open && <div className="drawer-overlay" onClick={onClose} />}

      <div className={`drawer ${open ? "open" : ""}`}>
        <div className="drawer-content glass">
          <div className="drawer-header">
            <h3>Inputs</h3>
            <button className="close-btn" onClick={onClose}>
              ✕
            </button>
          </div>

          <div className="drawer-body">
            {hasValue(resume) && (
              <div className="input-block">
                <h4>📄 Resume</h4>
                <p>{resume}</p>
              </div>
            )}

            <div className="input-block">
              <h4>📌 Job Description</h4>
              <p>{jd}</p>
            </div>

            {hasValue(self) && (
              <div className="input-block">
                <h4>🧠 Self Description</h4>
                <p>{self}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InputDrawer;
