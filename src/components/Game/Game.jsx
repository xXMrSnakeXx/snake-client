import clsx from "clsx";
import css from "./Game.module.css";
import { useEffect, useState } from "react";
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
  });
  useEffect(() => {
    const interval = setInterval(() => {
      const newSnake = snake;
      let move = [];
      let newFood;
      switch (direction) {
        case AVAILABLE_MOVIES[0]:
          move = [1, 0];
          break;
        case AVAILABLE_MOVIES[1]:
          move = [-1, 0];
          break;
        case AVAILABLE_MOVIES[2]:
          move = [0, 1];
          break;
        case AVAILABLE_MOVIES[3]:
          move = [0, -1];
          break;
      }
      const head = [
        checkSlot(newSnake[newSnake.length - 1][0] + move[0]),
        checkSlot(newSnake[newSnake.length - 1][1] + move[1]),
      ];
      newSnake.push(head);
      let spliceIndex = 1;
      if (head[0] === food[0] && head[1] === food[1]) {
        spliceIndex = 0;
        do {
          newFood = [
            Math.floor(Math.random() * BOARD_SIZE),
            Math.floor(Math.random() * BOARD_SIZE),
          ];
        } while (
          snake.some((el) => el[0] === newFood[0] && el[1] === newFood[1])
        );
        setFood(newFood);
      }
      setSnake(newSnake.splice(spliceIndex));
    }, SPEED);

    return () => clearInterval(interval);
  }, [direction, food, snake]);



  const checkSlot = (position) => {
    switch (true) {
      case position >= BOARD_SIZE:
        return 0;
      case position < 0:
        return BOARD_SIZE - 1;
      default:
        return position;
    }
  };
  return (
    <div className={css.container}>
        <div className={css.game_container}>
      {DEFAULT_CELL_VALUE.map((row, indexX) => (
        <div key={indexX} className={css.row}>
          {row.map((cell, indexY) => {
            let type =
              snake.some((el) => el[0] === indexX && el[1] === indexY) &&
              "snake";
            if (type !== "snake") {
              type = food[0] === indexX && food[1] === indexY && "food";
            }
            return <div className={clsx(css.cell, css[type])} key={indexY} />;
          })}
        </div>
      ))}
</div>
<div className={css.controller_container}>
      <div
        className={clsx(css.arrow, css.down, {
          [css.selected]: direction === "ArrowDown",
        })}
      />
      <div
        className={clsx(css.arrow, css.up, {
          [css.selected]: direction === "ArrowUp",
        })}
      />
      <div
        className={clsx(css.arrow, css.right, {
          [css.selected]: direction === "ArrowRight",
        })}
      />
      <div
        className={clsx(css.arrow, css.left, {
          [css.selected]: direction === "ArrowLeft",
        })}
      />
      </div>
    </div>
  );
};
