'use server'

import { URL_FETCH } from "@/interface/constsGlobal";
import { CreateProductDto, Product, UpdateProductDto } from "@/interface/product/Product";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllProduct = async (query: string, currentPage: number): Promise<{products : Product[] , error : any} > => {
  const cookieStore = cookies()
  const token = cookieStore.get('authToken')
  try {
    const res = await fetch(
      `${URL_FETCH}/product`,
      {
        headers: { Authorization: `Bearer ${token?.value}` },
        next: {
          revalidate: 60,
          tags: ['getAllProduct']
        }
      }
    );
    const data = await res.json();
    if (Array.isArray(data)) {
      return {products: data , error:''};
    } else {
      return { products: [], error: data };
    }
    return data;
  } catch (error) {
    console.log(error);
    return {products:[] , error };
  }
}


export const getByIdProduct = async (id : number) => {
  const cookieStore = cookies()
  const token = cookieStore.get('authToken')
  try {
    const res = await fetch(
      `${URL_FETCH}/product/${id}`,
      {
        headers: { Authorization: `Bearer ${token?.value}` },
        next: { 
          revalidate: 60,
          tags: [`getByIdProduct${id}`]
        }
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export const createProduct = async (createProduct: CreateProductDto) => {
  const cookieStore = cookies()
  const token = cookieStore.get('authToken')
  const body = JSON.stringify(createProduct);

  try {
    const res = await fetch(`${URL_FETCH}/product`, {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.value}`,
      },
    });

    const data = await res.json();
    revalidateTag('getAllProduct')
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const updateProduct = async (updateProduct: UpdateProductDto, id : number) => {

  const cookieStore = cookies()
  const token = cookieStore.get('authToken')
  const body = JSON.stringify(updateProduct);
  console.log(id)
  try {
    const res = await fetch(`${URL_FETCH}/product/${id}`, {
      method: 'PUT',
      body: body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.value}`,
      },
    });

    const data = await res.json();
    console.log(data)
    revalidateTag('getAllProduct')
    revalidateTag(`getByIdProduct${id}`)
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const deleteProduct = async ( id : number) => {
  const cookieStore = cookies()
  const token = cookieStore.get('authToken')

  try {
    const res = await fetch(`${URL_FETCH}/product/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.value}`,
      },
    });

    const data = await res.json();
    console.log(data)
    revalidateTag('getAllProduct')
    revalidateTag(`getByIdProduct${id}`)
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
};