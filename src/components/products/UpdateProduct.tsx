'use client';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Tag } from '@/interface/tag/Tag';
import { Brand } from '@/interface/brand/Brand';
import { UpdateProductDto } from '@/interface/product/Product';
import { getAllTag } from '@/lib/fetch/tagFetch/tagFetch';
import { getAllBrand } from '@/lib/fetch/brandFetch/brandFetch';
import { updateProduct } from '@/lib/fetch/productFetch/productFetch';

interface UpdateProductProps {
  idProduct: number;
  closeModal: () => void;
}

const UpdateProduct = ({ idProduct , closeModal } : UpdateProductProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProductDto>();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const onSubmit = (data : UpdateProductDto ) => {
    if (typeof data.brandId === 'string')
      data.brandId = parseInt(data.brandId, 10);
    if (typeof data.prescriptionRequired === 'string')
      data.prescriptionRequired = parseInt(data.prescriptionRequired, 10);
    if (Array.isArray(data.tagIds)) {
      data.tagIds = data.tagIds.map((tagId) => {
        if (typeof tagId === 'string') {
          return parseInt(tagId, 10);
        }
        return tagId;
      });
    }
    console.log(data)
    updateProduct(data, idProduct);
    closeModal()
  };

  useEffect(() => {
    const fetchDataTag = async () => {
      try {
        const tagsData = await getAllTag();
        setTags(tagsData);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchDataBrand = async () => {
      try {
        const brandsData = await getAllBrand();
        setBrands(brandsData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataBrand();
    fetchDataTag();
  }, []);

  return (
    <form className="flex flex-wrap -mx-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col px-2">
        <div className="flex flex-col ">
          <label htmlFor="brand">Nombre Producto</label>
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
          <label htmlFor="brand">Description</label>
          <input
            className="p-2"
            {...register('description', {
              required: 'La descripcion es obligatorio',
              minLength: {
                value: 3,
                message: 'La descripcion debe tener al menos 3 caracter',
              },
              maxLength: {
                value: 50,
                message: 'La descripcion no puede exceder los 50 caracteres',
              },
            })}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col px-2 w-1/2">
        <div className="flex flex-col">
          <label htmlFor="prescriptionRequired">Prescription Requerida?</label>
          <select
            className="p-2 "
            {...register('prescriptionRequired', {
              required: 'La prescription es obligatorio',
            })}
          >
            <option value="0">Eliga una opcion</option>
            <option value="1">Sí</option>
            <option value="0">No</option>
          </select>
          {errors.prescriptionRequired && (
            <p className="text-red-500">
              {errors.prescriptionRequired.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="brand">Elija marca</label>
          <select
            className="p-2"
            {...register('brandId', { required: true })}
          >
            <option value="0">Eliga marca</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
          {errors.brandId && (
            <p className="text-red-500">{errors.brandId.message}</p>
          )}
        </div>
      </div>
<div className="flex flex-col px-2 w-1/2">
<div className="flex flex-col">
        <label htmlFor="tags">Elija etiqueta</label>
        <select
          className="p-2"
          {...register('tagIds', { required: true })}
          multiple
        >
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
        {errors.tagIds && (
          <p className="text-red-500">{errors.tagIds.message}</p>
        )}
      </div>
</div>
      
      <div className="flex flex-col ">
        <button className="p-2 m-2 bg-slate-500 rounded" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default UpdateProduct;