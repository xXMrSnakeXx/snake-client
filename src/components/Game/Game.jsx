import css from "./Game.module.css";
import { useEffect, useState } from "react";
import { Row } from "../Row/Row";
import { Controller } from "../Controller/Controller";
import { checkSlot } from "../../helpers/checkSlot";
import { generateFood } from "../../helpers/generateFood";
import { generateMove } from "../../helpers/generateMove";

const BOARD_SIZE = 10;
const DEFAULT_CELL_VALUE = Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(0));
const AVAILABLE_MOVIES = ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"];
// const SPEED = 500;
const FOOD_TYPES = [
    { type: 'food1', points: 1 },
    { type: 'food5', points: 5 },
    { type: 'food10', points: 10 }
  ];

export const Game = () => {
  const [direction, setDirection] = useState(AVAILABLE_MOVIES[0]);
  const [snake, setSnake] = useState([[1, 1]]);
  const [food, setFood] = useState(generateFood(BOARD_SIZE, snake, FOOD_TYPES));
  const [score, setScore] = useState(0)
  const [speed, setSpeed] = useState(500)
  const [nextSpeedIncrease, setNextSpeedIncrease] = useState(50);
const [speedLevel, setSpeedLevel] = useState(1)

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
      if (head[0] === food.position[0] && head[1] === food.position[1]) {
        spliceIndex = 0;
        const newScore = score + food.points;
        setScore(newScore);
        if (newScore >= nextSpeedIncrease) {
          setSpeed((prevSpeed) => Math.max(prevSpeed - 50, 100));
          setNextSpeedIncrease(prevSpeedIncrease=> prevSpeedIncrease + 50)
          setSpeedLevel(prevLevel=> prevLevel +1)
        }
        setFood(generateFood(BOARD_SIZE, snake, FOOD_TYPES));
      }
      setSnake(newSnake.splice(spliceIndex));
    }, speed);

    return () => clearInterval(interval);
  }, [direction, food, nextSpeedIncrease, score, snake, speed]);

  return (
    <div className={css.container}>
      <h2 className={css.title}>Your progress : {score} Speed level: {speedLevel}</h2>
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
