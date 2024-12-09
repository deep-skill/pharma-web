'use client';
import Modal from '../Modal';
import React, { useState } from 'react';
import CreateTag from './CreateTag';


const ModalCreate = () => {
  const [modalShow, setModalShow] = useState(false);

  const openModal = () => {
    setModalShow(true);
  };
  const closeModal = () => {
    setModalShow(false);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-blue-400 p-1 m-2 rounded hover:bg-blue-500 active:bg-blue-700"
      >
        Crear Tag
      </button>
      <Modal show={modalShow} onClose={closeModal}>
        <CreateTag closeModal={closeModal} />
      </Modal>
    </div>
  );
};
export default ModalCreate;
