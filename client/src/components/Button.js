import styles from "./Button.module.css";

const Button = ({ className, onClick, text, type, buttonColor }) => {
  let buttonColorClassName = "";

  if (buttonColor === "red") {
    buttonColorClassName = styles.redButton;
  } else if (buttonColor === "green") {
    buttonColorClassName = styles.greenButton;
  }

  return (
    <button
      type={type ? type : "button"}
      className={`${styles.button} ${
        className ? className : ""
      } ${buttonColorClassName}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
