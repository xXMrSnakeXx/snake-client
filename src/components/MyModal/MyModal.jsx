import Modal from "react-modal";
import { UserForm } from "../UserForm/UserForm";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    border:"none",
    transform: "translate(-50%, -50%)",
    backgroundColor: "var(--color-grey)"
  },
  overlay:{
    backgroundColor: 'rgba(0,0,0, 0.5) '
  }
};

Modal.setAppElement("#root");

export const MyModal = ({ modalIsOpen, closeModal, handleSubmit }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <UserForm  onSubmit={handleSubmit}/>
    </Modal>
  );
};
