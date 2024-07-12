import { useEffect, useState } from "react";
import { Header } from "./components/Header/Header";
import { UserList } from "./components/UserList/UserList";
import { Loader } from "./components/Loader/Loader";
import { Heading } from "./components/Heading/Heading";
import { Section } from "./components/Section/Section";
import { Container } from "./components/Container/Container";
import { Game } from "./components/Game/Game";

import { MyModal } from "./components/MyModal/MyModal";
import { useUsersStore } from "./store/useUsersStore";

function App() {
  const [showModal, setShowModal] = useState(true);

  const { loading, error, getUsers } = useUsersStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const closeModal = () => {
    setShowModal(false);
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
            <MyModal modalIsOpen={showModal} closeModal={closeModal} />
          )}

          <Game />
          <UserList />
          {loading && <Loader />}
        </Container>
      </Section>
    </>
  );
}

export default App;
