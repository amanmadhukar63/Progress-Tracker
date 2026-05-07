import { useState } from "react";
import "./Goals.scss";
import Modal from 'react-modal';
import { useSearchParams } from "react-router-dom";

export default function Goals() {

  const [searchParams, setSearchParams] = useSearchParams();
  const isOpen = searchParams.get("create");
  const [modalOpen, setModalOpen] = useState(isOpen?.toLowerCase()==="true" ? true : false);

  function closeModal() {
    setModalOpen(false);
    setSearchParams("?create=false", { replace: true});
  }

  function handleCreateGoal() {
    setModalOpen(true);
    setSearchParams("?create=true", {replace: true});
  }

  return (
    <div>
      Goals
      <button onClick={handleCreateGoal}>Create</button>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
      >
          <h1>Hi</h1>
      </Modal>
    </div>
  );
}