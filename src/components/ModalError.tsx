'use client';

import { useState } from 'react';
import Modal from './Modal';
import { useRouter } from 'next/navigation';

const ModalError = ({ error }: { error: string }) => {
  const [modalShow, setModalShow] = useState(true);
  const router = useRouter();

  const closeModal = () => {
    setModalShow(false);
  };

  const redirect = () => {
    router.push('/');
  };

  switch(error){
    case 'fetch failed':
      error = 'LEVANTA LA API PAPA FRITA' 
      break
    case 'Insufficient permissions':
      error = 'Sin permiso para ingesar'
      break
    default:
  }

  return (
    <div>
      <Modal show={modalShow} onClose={closeModal} error={true}>
        <div>
          <p>{error}</p>
        </div>
        <div>
          <button
          className="bg-red-400 p-1 m-2 rounded hover:bg-red-500 active:bg-red-700" 
          onClick={redirect}>Volver la home</button>
        </div>
      </Modal>
    </div>
  );
};
export default ModalError;
