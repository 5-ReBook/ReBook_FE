import './InputField.css';

const InputField = ({ label, value, onChange, type = 'text', placeholder }) => {
  return (
    <div className="form-group">
      <input
        type={type}
        placeholder={placeholder || label}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
