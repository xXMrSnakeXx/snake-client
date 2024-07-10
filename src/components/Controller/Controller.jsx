import clsx from 'clsx'
import css from './Controller.module.css'

export const Controller = ({direction}) => {
  return (
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
  )
}
