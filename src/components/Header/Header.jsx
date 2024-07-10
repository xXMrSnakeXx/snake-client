import css from "./Header.module.css";
import { GiSnake } from "react-icons/gi";
export const Header = () => {
  return (
    <header className={css.header}>
      <div className={css.wrapper}>
        <GiSnake className={css.logo} />

        <h1 className={css.title}> nake Game</h1>
      </div>
    </header>
  );
};
