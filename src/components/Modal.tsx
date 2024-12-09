import React, { type ReactNode } from 'react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
  error? : boolean
}

const Modal= ({ show, onClose, children , error} : ModalProps) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-slate-200 p-6 rounded-lg shadow-lg">
        {children}
        {!error && (<button
          onClick={onClose}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Cerrar
        </button>)}
        
      </div>
    </div>
  );
};

export default Modal;
