export const generateFoodPosition = (BOARD_SIZE, snake) => {
    let newFood;
    do {
      newFood = [
        Math.floor(Math.random() * BOARD_SIZE),
        Math.floor(Math.random() * BOARD_SIZE),
      ];
    } while (snake.some((el) => el[0] === newFood[0] && el[1] === newFood[1]));
    return newFood;
  };