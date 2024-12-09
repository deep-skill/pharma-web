'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

const NavBar = () => {
  const { user, error, isLoading } = useUser();
  if (error != null) return <div>{error.message}</div>;

  const styleLink =
    'text-center py-2 px-2 rounded-lg border-2 hover:bg-slate-200 border-black';

  if (user == null) {
    return (
      <nav className="flex flex-row  m-2 p-2 justify-between gap-2">
        <h1 className="text-4xl font-semibold">
          <Link href="/">DEEP PHARMA</Link>
        </h1>
        <Link href="/api/auth/login" className={styleLink}>
          Inicio de sesión
        </Link>
      </nav>
    );
  }
  return (
    <nav className="flex flex-row  m-2 p-2 justify-between gap-2">
      <h1 className="text-4xl font-semibold">
        <Link href="/">DEEP PHARMA</Link>
      </h1>
      <div className="flex gap-3">
        <Link href="/home" className={styleLink}>
          Home Page
        </Link>
        <Link href="/forms/brand" className={styleLink}>
          Brands
        </Link>
        
        <Link href={'/forms/product'} className={styleLink}>
          Product
        </Link>
        <Link href="/forms/tag" className={styleLink}>
          Tag
        </Link>
        <Link
          className="py-2 px-6 rounded-lg bg-sky-700 text-white"
          href="/api/auth/logout"
        >
          Log out
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
