export const AVAILABLE_MOVIES = [
  "ArrowDown",
  "ArrowUp",
  "ArrowRight",
  "ArrowLeft",
];
export const BOARD_SIZE = 10;
export const DEFAULT_CELL_VALUE = Array(BOARD_SIZE).fill(
  Array(BOARD_SIZE).fill(0)
);
export const FOOD_TYPES = [
  { type: "food1", points: 1 },
  { type: "food5", points: 5 },
  { type: "food10", points: 10 },
];
