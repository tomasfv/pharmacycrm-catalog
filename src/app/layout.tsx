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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-7 h-7 text-gray-700"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
      <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-sm rounded-full h-6 min-w-[24px] flex items-center justify-center px-1.5">
        {count}
      </span>
    </Link>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-2xl mx-auto px-5 h-20 flex items-center justify-between">
        <Link href="/categories" className="flex items-center h-20">
          <img
            src="/logoFarmacia.jpeg"
            alt="Farmacia"
            className="h-[66px] object-contain"
          />
        </Link>
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50 min-h-screen">
        <StoreProvider>
          <InitCart />
          <Navbar />
          <main className="max-w-2xl mx-auto px-5 py-8 pb-28">{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
