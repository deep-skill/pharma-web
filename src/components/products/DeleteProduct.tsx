import { deleteProduct } from '@/lib/fetch/productFetch/productFetch';
import { useRouter } from 'next/navigation';

interface Props {
  idProduct: number;
  closeModal: () => void;
}

const DeleteProduct = ({ idProduct, closeModal }: Props) => {
  const router = useRouter();

  const onSubmit = async () => {
    try {
      await deleteProduct(idProduct)
      router.refresh();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      desea eliminar el tag {idProduct}
      <button
        className="bg-red-400 p-1 m-2 rounded hover:bg-red-500 active:bg-red-700"
        onClick={onSubmit}
      >
        eliminar
      </button>
    </div>
  );
};

export default DeleteProduct;
