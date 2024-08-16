import React from 'react';
import "./InputFieldWithButton.css";

const InputFieldWithButton = ({ type, onClickHandler, buttonImage, value, onChange }) => {
    return (
      <div className="input-field__container">
        <input 
          className="input-field__input" 
          type={type} 
          value={value} 
          onChange={onChange}
          autoComplete='off'
        />
        <button
          className="input-field__button"
          onClick={onClickHandler}
        >
          <img src={buttonImage} alt="버튼" />
        </button>
      </div>
    );
};

export default InputFieldWithButton;