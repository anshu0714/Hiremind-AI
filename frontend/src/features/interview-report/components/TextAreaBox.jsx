const TextAreaBox = ({ label, name, placeholder, value, onChange }) => {
  const id = name;

  return (
    <div className="input-box">
      <label htmlFor={id}>{label}</label>

      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        maxLength={1000}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
    </div>
  );
};

export default TextAreaBox;
