import './Button.css';

// 사용하는 쪽에서 css override 가능하게 수정
const Button = ({ text, onClick, className = "" }) => {
  return (
    <button onClick={onClick} className={`Button ${className}`}>
      {text}
    </button>
  );
};

export default Button;
