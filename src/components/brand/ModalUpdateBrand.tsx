'use client';
import Modal from '../Modal';
import { useState } from 'react';
import UpdateBrand from './UpdateBrand';

const ModalUpdateBrand = ({ idBrand }: { idBrand: number }) => {
  const [modalShow, setModalShow] = useState(false);

  const openModal = () => setModalShow(true);
  const closeModal = () => setModalShow(false);

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-green-400 p-1 m-2 rounded hover:bg-green-500 active:bg-green-700"
      >
        Modificar
      </button>
      <Modal show={ modalShow } onClose={ closeModal }>
        <UpdateBrand idBrand={ idBrand } closeModal={closeModal}/>
      </Modal>
    </div>
  );
};
export default ModalUpdateBrand;