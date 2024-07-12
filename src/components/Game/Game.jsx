import css from "./Game.module.css";
import { useEffect, useState } from "react";
import { Row } from "../Row/Row";
import { Controller } from "../Controller/Controller";
import { checkSlot } from "../../helpers/checkSlot";
import { generateFood } from "../../helpers/generateFood";
import { generateMove } from "../../helpers/generateMove";
import { Heading } from "../Heading/Heading";
import { Button } from "../Button/Button";
import { addScore } from "../../services/api";
import { useUsersStore } from "../../store/useUsersStore";
import { useScoreStore } from "../../store/useScoreStore";
import {
  AVAILABLE_MOVIES,
  BOARD_SIZE,
  DEFAULT_CELL_VALUE,
  FOOD_TYPES,
} from "../../constants/constants";

export const Game = () => {
  const {
    score,
    setScore,
    direction,
    setDirection,
    snake,
    setSnake,
    speed,
    setSpeed,
    nextSpeedIncrease,
    setNextSpeedIncrease,
    speedLevel,
    setSpeedLevel,
    resetScoreStore,
    pause,
    setPause,
    gameOver,
    setGameOver,
  } = useScoreStore();
  const { getUsers, userName } = useUsersStore();

  const [food, setFood] = useState(generateFood(BOARD_SIZE, snake, FOOD_TYPES));

  const [error, setError] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const index = AVAILABLE_MOVIES.indexOf(e.key);
      if (index > -1) {
        e.preventDefault();
        setDirection(AVAILABLE_MOVIES[index]);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setDirection]);

  useEffect(() => {
    if (gameOver || pause || !userName) return;
    const interval = setInterval(() => {
      const newSnake = [...snake];
      const move = generateMove(direction, AVAILABLE_MOVIES);
      const head = [
        checkSlot(newSnake[newSnake.length - 1][0] + move[0], BOARD_SIZE),
        checkSlot(newSnake[newSnake.length - 1][1] + move[1], BOARD_SIZE),
      ];
      if (newSnake.some((el) => el[0] === head[0] && el[1] === head[1])) {
        setGameOver(true);
        clearInterval(interval);
        return;
      }

      newSnake.push(head);
      let spliceIndex = 1;
      if (head[0] === food.position[0] && head[1] === food.position[1]) {
        spliceIndex = 0;
        const newScore = score + food.points;
        setScore(newScore);
        if (newScore >= nextSpeedIncrease) {
          setSpeed(Math.max(speed - 50, 100));
          setNextSpeedIncrease(nextSpeedIncrease + 50);
          setSpeedLevel(speedLevel + 1);
        }
        setFood(generateFood(BOARD_SIZE, snake, FOOD_TYPES));
      }
      setSnake(newSnake.splice(spliceIndex));
    }, speed);

    return () => clearInterval(interval);
  }, [
    direction,
    food.points,
    food.position,
    gameOver,
    nextSpeedIncrease,
    pause,
    score,
    setGameOver,
    setNextSpeedIncrease,
    setScore,
    setSnake,
    setSpeed,
    setSpeedLevel,
    snake,
    speed,
    speedLevel,
    userName,
  ]);

  useEffect(() => {
    const updateScore = async () => {
      try {
        await addScore(userName, score);
        await getUsers();
      } catch (error) {
        setError(error);
      }
    };
    if (gameOver) {
      updateScore();
    }
  }, [gameOver, getUsers, score, userName]);

  const restart = () => {
    setGameOver(false);
    setDirection(AVAILABLE_MOVIES[0]);
    setScore(0);
    setSpeed(500);
    setSpeedLevel(1);
    setSnake([[1, 1]]);
    resetScoreStore();
  };
  const tooglePause = () => {
    setPause(!pause);
  };

  return (
    <div className={css.container}>
      <Button onClick={gameOver ? restart : tooglePause} type="button">
        {gameOver ? "Restar" : pause ? "Start" : "Stop"}
      </Button>

      <h2 className={css.title}>
        {userName} progress : {score} Speed level: {speedLevel}
      </h2>
      {gameOver && <Heading error title="Game over 😐 Try again!" />}
      {error && <Heading error title={`Something went wrong...😐`} />}
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
