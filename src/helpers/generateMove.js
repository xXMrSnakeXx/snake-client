export const generateMove = (direction, AVAILABLE_MOVIES)=>{
    let move = [];

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
      return move
}