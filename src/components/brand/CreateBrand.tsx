'use client';
import { useForm } from 'react-hook-form';
import { CreateBrandDto } from '@/interface/brand/Brand';
import { createBrand } from '@/lib/fetch/brandFetch/brandFetch';

const CreateBrand = ({ closeModal }: { closeModal: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBrandDto>();

  const onSubmit = async (data : CreateBrandDto) => {
    await createBrand(data);
    closeModal()
  };

  return (
    <form className="flex flex-col  gap-2 " onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col ">
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
      <div className="flex flex-col ">
        <button className="p-2 m-2 bg-slate-500 rounded" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

export default CreateBrand