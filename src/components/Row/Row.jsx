import { Cell } from '../Cell/Cell';
import css from './Row.module.css'

export const Row = ({ row, indexX, snake, food }) => {
 
  return (
    <div className={css.row}>
      {row.map((cell, indexY) => {
        let type =
          snake.some((el) => el[0] === indexX && el[1] === indexY) && "snake";
   
        if (type !== "snake") {
          type = food.position[0] === indexX && food.position[1] === indexY && food.type;
        }
        const isHead = snake[snake.length - 1][0] === indexX && snake[snake.length - 1][1] === indexY;
  
        return <Cell key={indexY} type={type} isHead={isHead}/>;
      })}
    </div>
  )
}
