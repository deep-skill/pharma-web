'use client';
import { UpdateBrandDto } from '@/interface/brand/Brand';
import { updateBrand } from '@/lib/fetch/brandFetch/brandFetch';
import { useForm } from 'react-hook-form';

interface UpdateBrandProps {
  idBrand: number;
  closeModal: () => void;
}

const UpdateBrand = ({ idBrand , closeModal }: UpdateBrandProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateBrandDto>();

  const onSubmit = async (data : UpdateBrandDto) => {
    await updateBrand(data , idBrand)
    closeModal()
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <label htmlFor="brand">Brand</label>
        <input
          className="p-2 w-full"
          {...register('name', {
            required: 'El nombre es obligatorio',
            minLength: {
              value: 3,
              message: 'El nombre debe tener al menos 3 caracter',
            },
            maxLength: {
              value: 50,
              message: 'El nombre no puede exceder los 50 caracteres',
            },
          })}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div className="flex flex-col">
        <button
          className="bg-slate-400 p-1 m-2 rounded hover:bg-slate-500 active:bg-slate-700"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default UpdateBrand;
