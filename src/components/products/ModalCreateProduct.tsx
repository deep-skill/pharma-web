'use client';
import Modal from '../Modal';
import { useState } from 'react';
import CreateProduct from './CreateProduct';


const ModalCreateProduct = () => {
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
        Crear Product
      </button>
      <Modal show={modalShow} onClose={closeModal}>
        <CreateProduct closeModal={closeModal}/>
      </Modal>
    </div>
  );
};
export default ModalCreateProduct;