"use client"
import UpdateBrand from '@/components/brand/updateBrand';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import axios from 'axios';
import Link from 'next/link';
import { Brand } from "../../../../components/brand/Brand"

const getByIdBranAxios = async (id: number): Promise<Brand | undefined> => {
    try {
      const token  = await axios.get('/api/getToken');
        let response = await axios.get(`http://localhost:3001/brand/${id}`, {
          headers: {
            'Authorization': `Bearer ${token.data}`
        }
        })
        return response.data;
    } catch (error) {
        return undefined
    }
}

const  UpdateBrandPage = async ({ params }: { params: { id: number } }) => {
    const brandById = await getByIdBranAxios(params.id)
    if (!brandById) {
        return (
            <section className="flex flex-col align-center justify-center items-center w-full h-full p-2 bg-slate-300 gap-3">
                <div>No se encontró la marca con el ID especificado</div>
                <Link href={'/forms/brand'} className="bg-slate-400 p-1 m-2 rounded hover:bg-slate-500 active:bg-slate-700">
                    Volver a Brand
                </Link>
            </section>
        );
    }
    return (
        <section className="flex flex-col align-center justify-center items-center w-full h-full p-2 bg-slate-300 gap-3">
            <div>
                <h3>{brandById.id}</h3>
                <p>{brandById.name}</p>
            </div>
            <UpdateBrand idBrand={params.id} />
            <Link href={"/forms/brand"} className='bg-slate-400 p-1 m-2 rounded hover:bg-slate-500 active:bg-slate-700'>Volver a Brand</Link>
        </section>
    );
}

export default withPageAuthRequired(UpdateBrandPage)
