import css from "./Button.module.css";

export const Button = ({ children, onClick, type, style }) => {
  return (
    <button type={type} onClick={onClick} className={css.btn} style={style}>
      {children}
    </button>
  );
};
