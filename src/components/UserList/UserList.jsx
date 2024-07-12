import { useUsersStore } from "../../store/useUsersStore";
import css from "./UserList.module.css";
export const UserList = () => {
  const { users } = useUsersStore();
  return (
    <div>
      <h2 className={css.title}>Player rating</h2>
      <ul className={css.list}>
        {users.map(({ id, user_name, score }) => (
          <li key={id} className={css.item}>
            <h2> {user_name} :</h2>
            <span>{score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
