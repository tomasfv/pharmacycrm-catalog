"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { StoreProvider } from "@/store/provider";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { initCart, selectCartItemCount } from "@/store/cartSlice";
import "./globals.css";

function CartIcon() {
  const count = useAppSelector(selectCartItemCount);
  if (count === 0) return null;
  return (
    <Link href="/cart" className="relative">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
      <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 min-w-[20px] flex items-center justify-center px-1">
        {count}
      </span>
    </Link>
  );
}

function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/categories" || pathname === "/";

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
        {isHome ? (
          <h1 className="text-lg font-bold text-gray-900">Catálogo</h1>
        ) : (
          <Link href="/categories" className="text-sm text-primary-600 font-medium flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Volver
          </Link>
        )}
        <CartIcon />
      </div>
    </header>
  );
}

function InitCart() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initCart());
  }, [dispatch]);
  return null;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 min-h-screen">
        <StoreProvider>
          <InitCart />
          <Navbar />
          <main className="max-w-lg mx-auto px-4 py-6 pb-24">{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
