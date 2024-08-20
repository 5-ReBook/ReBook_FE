import React from 'react';
import './InputFieldWithButton.css';

function InputFieldWithButton({
  type,
  onClickHandler,
  buttonImage,
  value,
  onChange,
  disabled = 0,
  className = '',
}) {
  return (
    <div className={`input-field__container ${className}`}>
      <input
        className="input-field__input"
        type={type}
        value={value}
        onChange={onChange}
        autoComplete="off"
        disabled={disabled !== 0}
      />
      <button
        type="button"
        className="input-field__button"
        onClick={onClickHandler}
      >
        <img src={buttonImage} alt="버튼" />
      </button>
    </div>
  );
}

export default InputFieldWithButton;
