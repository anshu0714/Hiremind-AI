import { useRef, useEffect } from "react";

const TextAreaBox = ({ label, name, placeholder, value, onChange }) => {
  const id = name;
  const maxLength = 1000;
  const textareaRef = useRef();

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";

      const newHeight = Math.min(el.scrollHeight, 200);
      el.style.height = newHeight + "px";
    }
  }, [value]);

  return (
    <div className="input-box">
      <div className="label-row">
        <label htmlFor={id}>{label}</label>
        <span className="char-count">
          {value.length}/{maxLength}
        </span>
      </div>

      <textarea
        ref={textareaRef}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
    </div>
  );
};

export default TextAreaBox;
