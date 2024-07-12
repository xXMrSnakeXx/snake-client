import { useScoreStore } from "../../store/useScoreStore";
import { useUsersStore } from "../../store/useUsersStore";
import { Button } from "../Button/Button";
import css from "./Header.module.css";
import { GiSnake } from "react-icons/gi";
export const Header = ({ setShowModal }) => {
  const { resetUserName } = useUsersStore();
  const { resetScoreStore } = useScoreStore();
  const handleClick = () => {
    resetUserName();
    resetScoreStore();
    setShowModal(true);
  };

  return (
    <header className={css.header}>
      <div className={css.wrapper}>
        <GiSnake className={css.logo} />

        <h1 className={css.title}> nake Game</h1>
      </div>
      <Button
        type="button"
        onClick={handleClick}
        style={{
          margin: 0,
          backgroundColor: "var(--color-error)",
          width: "140px",
          marginRight: "35px",
        }}
      >
        New player
      </Button>
    </header>
  );
};
