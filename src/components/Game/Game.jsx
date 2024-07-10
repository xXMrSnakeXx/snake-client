import css from "./Game.module.css";
import { useEffect, useState } from "react";
import { Row } from "../Row/Row";
import { Controller } from "../Controller/Controller";
import { checkSlot } from "../../helpers/checkSlot";
import { generateFoodPosition } from "../../helpers/generateFoodPosition ";
import { generateMove } from "../../helpers/generateMove";

const BOARD_SIZE = 10;
const DEFAULT_CELL_VALUE = Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(0));
const AVAILABLE_MOVIES = ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"];
const SPEED = 500;

export const Game = () => {
  const [direction, setDirection] = useState(AVAILABLE_MOVIES[0]);
  const [snake, setSnake] = useState([[1, 1]]);
  const [food, setFood] = useState([0, 0]);

  const handleKeyDown = (e) => {
    e.preventDefault();
    const index = AVAILABLE_MOVIES.indexOf(e.key);
    if (index > -1) {
      setDirection(AVAILABLE_MOVIES[index]);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newSnake = [...snake];
      const move = generateMove(direction, AVAILABLE_MOVIES);
      const head = [
        checkSlot(newSnake[newSnake.length - 1][0] + move[0], BOARD_SIZE),
        checkSlot(newSnake[newSnake.length - 1][1] + move[1], BOARD_SIZE),
      ];

      newSnake.push(head);
      let spliceIndex = 1;
      if (head[0] === food[0] && head[1] === food[1]) {
        spliceIndex = 0;

        setFood(generateFoodPosition(BOARD_SIZE, snake));
      }
      setSnake(newSnake.splice(spliceIndex));
    }, SPEED);

    return () => clearInterval(interval);
  }, [direction, food, snake]);

  return (
    <div className={css.container}>
      <div className={css.game_container}>
        {DEFAULT_CELL_VALUE.map((row, indexX) => (
          <Row
            key={indexX}
            row={row}
            indexX={indexX}
            snake={snake}
            food={food}
         
          />
        ))}
      </div>
      <Controller direction={direction} />
    </div>
  );
};
