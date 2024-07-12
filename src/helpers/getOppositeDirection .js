export const getOppositeDirection = (direction) => {
    switch (direction) {
      case "ArrowUp":
        return "ArrowDown";
      case "ArrowDown":
        return "ArrowUp";
      case "ArrowLeft":
        return "ArrowRight";
      case "ArrowRight":
        return "ArrowLeft";
      default:
        return null;
    }
  };