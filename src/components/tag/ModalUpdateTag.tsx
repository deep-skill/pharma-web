'use client';
import Modal from '../Modal';
import React, { useState } from 'react';
import UpdateTag from '@/components/tag/UpdateTag';

const ModalUpdate = ({ idTag }: { idTag: number }) => {
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
        className="bg-green-400 p-1 m-2 rounded hover:bg-green-500 active:bg-green-700"
      >
        Modificar
      </button>
      <Modal show={modalShow} onClose={closeModal}>
        <UpdateTag key={idTag} idTag={idTag} closeModal={closeModal} />
      </Modal>
    </div>
  );
};
export default ModalUpdate;
