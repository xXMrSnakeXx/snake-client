import css from './Button.module.css'

export const Button = ({children, onClick}) => {
  return (
    <button type="button" onClick={onClick} className={css.btn}>{children}</button>
  )
}
