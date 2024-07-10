import clsx from "clsx";
import css from "./Cell.module.css";
import { GiSnakeBite } from "react-icons/gi";
import { CiApple } from "react-icons/ci";
export const Cell = ({ type, isHead }) => {
  return (
    <div
      className={clsx(css.cell, css[type], {
        [css.head]: isHead,
      })}
    >
      {isHead && <span className={css.icon}><GiSnakeBite /></span>}
      {type==="food" && <span className={css.icon}><CiApple /></span>}
    </div>
  );
};
