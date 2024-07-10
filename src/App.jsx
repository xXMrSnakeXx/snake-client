import { useEffect, useState } from "react";
import { Header } from "./components/Header/Header";
import { fetchUsers } from "./services/api";
import { UserList } from "./components/UserList/UserList";
import { Loader } from "./components/Loader/Loader";
import { Heading } from "./components/Heading/Heading";
import { Section } from "./components/Section/Section";
import { Container } from "./components/Container/Container";
import { Game } from "./components/Game/Game";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);
  return (
    <>
    <Header />
    <Section>
      <Container>
        <Game/>
        <UserList users={users} />
        {loading && <Loader />}
        {error && (
          <Heading
            error
            title="Something went wrong...😐 Check the data validity and try again!"
          />
        )}
      </Container>
    </Section>
    </>
  );
}

export default App;
