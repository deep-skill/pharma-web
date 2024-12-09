'use server'

import { URL_FETCH } from "@/interface/constsGlobal";
import { CreateTagDto, Tag, UpdateTagDto } from "@/interface/tag/Tag";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllTag = async (): Promise<Tag[]> => {
  const cookieStore = cookies()
  const token = cookieStore.get('authToken')
  try {
    const res = await fetch(
      `${URL_FETCH}/tag`,
      {
        headers: { Authorization: `Bearer ${token?.value}` },
        next: { 
          revalidate: 60,
          tags: ['getAllTag']
        }
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return [] ;
  }
}

export const getSearchTag = async (query: string, currentPage: number): Promise<{ count: number; rows: Tag[] , error : any}> => {
  const cookieStore = cookies()
  const token = cookieStore.get('authToken')
  try {
    const res = await fetch(
      `${URL_FETCH}/tag-search?query=${query}&limit=10&page=${currentPage}`,
      {
        headers: { Authorization: `Bearer ${token?.value}` },
        next: { 
          revalidate: 60,
          tags: ['getAllTag']
        }
      }
    );
    const data = await res.json();
    if (typeof data.count === 'number' && Array.isArray(data.rows)) {
      return data;
    } else {
      return { count: 0, rows: [], error: data };
    }
    
  } catch (error) {
    console.log(error);
    return { count: 0, rows: [] , error};
  }
}

export const getByIdTag = async (id : number) => {
  const cookieStore = cookies()
  const token = cookieStore.get('authToken')
  try {
    const res = await fetch(
      `${URL_FETCH}/tag/${id}`,
      {
        headers: { Authorization: `Bearer ${token?.value}` },
        next: { 
          revalidate: 60,
          tags: [`getByIdTag${id}`]
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

export const createTag = async (createTag: CreateTagDto) => {
  const cookieStore = cookies()
  const token = cookieStore.get('authToken')
  const body = JSON.stringify(createTag);

  try {
    const res = await fetch(`${URL_FETCH}/tag`, {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.value}`,
      },
    });

    const data = await res.json();
    revalidateTag('getAllTag')
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const updateTag = async (updateTag: UpdateTagDto , id : number) => {
  const cookieStore = cookies()
  const token = cookieStore.get('authToken')
  const body = JSON.stringify(updateTag);

  try {
    const res = await fetch(`${URL_FETCH}/tag/${id}`, {
      method: 'PUT',
      body: body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.value}`,
      },
    });

    const data = await res.json();
    revalidateTag('getAllTag')
    revalidateTag(`getByIdTag${id}`)
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
};


export const deleteTag = async ( id : number) => {
  const cookieStore = cookies()
  const token = cookieStore.get('authToken')

  try {
    const res = await fetch(`${URL_FETCH}/tag/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.value}`,
      },
    });

    const data = await res.json();
    revalidateTag('getAllTag')
    revalidateTag(`getByIdTag${id}`)
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
};