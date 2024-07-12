import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AVAILABLE_MOVIES } from "../constants/constants";
import { immer } from "zustand/middleware/immer";

const initialState = {
  score: 0,
  direction: AVAILABLE_MOVIES[0],
  snake: [[1, 1]],
  speed: 500,
  nextSpeedIncrease: 50,
  speedLevel: 1,
  pause: false,
  gameOver: false,
};

export const useScoreStore = create(
  persist(
    immer((set) => ({
      ...initialState,
      setScore: (data) =>
        set((state) => {
          state.score = data;
        }),
      setDirection: (data) =>
        set((state) => {
          state.direction = data;
        }),
      setSnake: (data) =>
        set((state) => {
          state.snake = data;
        }),
      setSpeed: (data) =>
        set((state) => {
          state.speed = data;
        }),
      setNextSpeedIncrease: (data) =>
        set((state) => {
          state.nextSpeedIncrease = data;
        }),
      setSpeedLevel: (data) =>
        set((state) => {
          state.speedLevel = data;
        }),
      setPause: (data) =>
        set((state) => {
          state.pause = data;
        }),
      setGameOver: (data) =>
        set((state) => {
          state.gameOver = data;
        }),
      resetScoreStore: () => {
        set(initialState);
      },
    })),
    { name: "userScore" }
  )
);
