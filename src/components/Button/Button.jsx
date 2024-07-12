import css from './Button.module.css'

export const Button = ({children, onClick, type}) => {
  return (
    <button type={type} onClick={onClick} className={css.btn}>{children}</button>
  )
}
