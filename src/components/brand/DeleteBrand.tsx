import { deleteBrand } from '@/lib/fetch/brandFetch/brandFetch';
import { useRouter } from 'next/navigation';

interface Props {
  idBrand: number;
  closeModal: () => void;
}

const DeleteBrand = ({ idBrand, closeModal }: Props) => {
  const router = useRouter();

  const updateTagAxios = async () => {
    try {
      await deleteBrand(idBrand)
      router.refresh();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      desea eliminar el tag {idBrand}
      <button
        className="bg-red-400 p-1 m-2 rounded hover:bg-red-500 active:bg-red-700"
        onClick={updateTagAxios}
      >
        eliminar
      </button>
    </div>
  );
};

export default DeleteBrand;