import styles from "./Button.module.css";

const Button = ({ className, onClick, text, type }) => {
  return (
    <button
      type={type ? type : "button"}
      className={`${styles.button} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
