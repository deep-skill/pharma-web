'use client';

import React from 'react';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';
import Loading from './loading';
import Link from 'next/link';

const background: any = {
  Owner: 'bg-amber-500',
  Admin: 'bg-blue-500',
  Seller: 'bg-green-500',
};

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <Loading />;

  if (error != null) return <div>{error.message}</div>;

  if (!user) {
    return (
      <main className="w-full h-screen flex flex-col p-12">
        <h1 className="text-4xl font-semibold">DEEP PHARMA</h1>
        <section className="flex flex-grow justify-center items-center gap-6">
          <a
            href="/api/auth/login"
            className="w-60 text-center py-4 px-6 rounded-lg border-2 border-black"
          >
            Inicio de sesión
          </a>

          <Link
            href="/product-catalog"
            className="w-60 text-center py-4 px-6 rounded-lg border-2 border-black"
          >
            Catálogo de productos
          </Link>
        </section>
      </main>
    );
  }

  return (
    <div
      className={`flex flex-col p-4 gap-4 h-screen w-screen
      ${background[(user?.user_roles as Array<string>)[0]]}
      `}
    >
      <div className="flex justify-end gap-8">
        <a
          className="py-2 px-6 rounded-lg bg-sky-700 text-white"
          href="/api/auth/logout"
        >
          Log out
        </a>
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="p-4 bg-white shadow-lg rounded">
          {user.picture != null && user.name != null && (
            <Image
              className="rounded-md w-full mb-6"
              src={user.picture}
              alt={user.name}
              width={300}
              height={300}
            />
          )}
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
      </div>
    </div>
  );
}
