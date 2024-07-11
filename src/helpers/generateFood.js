export const generateFood = (BOARD_SIZE, snake, FOOD_TYPES ) => {
  const foodType = FOOD_TYPES[Math.floor(Math.random() * FOOD_TYPES.length)];
    let newFood;
    do {
      newFood = [
        Math.floor(Math.random() * BOARD_SIZE),
        Math.floor(Math.random() * BOARD_SIZE),
      ];
    } while (snake.some((el) => el[0] === newFood[0] && el[1] === newFood[1]));
    return {
      type: foodType.type,
      points: foodType.points,
      position: newFood
    };
  };