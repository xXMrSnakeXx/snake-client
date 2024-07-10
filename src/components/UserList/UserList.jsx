import css from "./UserList.module.css";
export const UserList = ({ users }) => {
  return (
    <div>
      <h2 className={css.title}>Player rating</h2>
      <ul className={css.list}>
        {users.map(({ id, name, progress }) => (
          <li key={id} className={css.item}>
            <h2> {name} :</h2>
            <span>{progress ? progress.score : 0 }</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
