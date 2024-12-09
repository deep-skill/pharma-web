'use client';
import Modal from '../Modal';
import { useState } from 'react';
import CreateBrand from './CreateBrand';


const ModalCreateBrand = () => {
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
        Crear Brand
      </button>
      <Modal show={modalShow} onClose={closeModal}>
        <CreateBrand closeModal={closeModal}/>
      </Modal>
    </div>
  );
};
export default ModalCreateBrand;
