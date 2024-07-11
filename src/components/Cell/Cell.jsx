import clsx from "clsx";
import css from "./Cell.module.css";
import { GiSnakeBite } from "react-icons/gi";
import { GiShinyApple } from "react-icons/gi";
import { GiCherry } from "react-icons/gi";
import { GiPear } from "react-icons/gi";
export const Cell = ({ type, isHead }) => {
  return (
    <div
      className={clsx(css.cell, css[type], {
        [css.head]: isHead,
      })}
    >
      {isHead && <span className={css.icon}><GiSnakeBite /></span>}
      {type==="food1" && <span className={css.icon}><GiPear /></span>}
      {type==="food5" && <span className={css.icon}><GiShinyApple /></span>}
      {type==="food10" && <span className={css.icon}><GiCherry /></span>}
    </div>
  );
};
