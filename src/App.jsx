import { useEffect, useState } from "react";
import { Header } from "./components/Header/Header";
import { addUser, fetchUsers } from "./services/api";
import { UserList } from "./components/UserList/UserList";
import { Loader } from "./components/Loader/Loader";
import { Heading } from "./components/Heading/Heading";
import { Section } from "./components/Section/Section";
import { Container } from "./components/Container/Container";
import { Game } from "./components/Game/Game";

import { MyModal } from "./components/MyModal/MyModal";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        setError("Please try again later !");
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };
  
  const handleSubmit = async (name) => {
    try {
      const data = await addUser(name);

      setUserName(data.name);
    } catch (error) {
      setError("The name must be unique !");
    }
    closeModal();
  };
  return (
    <>
      <Header />
      <Section>
        {error && (
            <Heading error title={`Something went wrong...😐  ${error}`} />
          )}
        <Container>
          {!error && !loading && (
            <MyModal
              modalIsOpen={showModal}
              closeModal={closeModal}
              handleSubmit={handleSubmit}
            />
          )}

          <Game userName={userName} />
          <UserList users={users} />
          {loading && <Loader />}
      
        </Container>
      </Section>
    </>
  );
}

export default App;
