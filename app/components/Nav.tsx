"use client";

import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store";
import { AiFillShopping } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import DarkLight from "@/app/components/DarkLight";
import { useSession } from "next-auth/react";

export default function Nav() {
  const cartStore = useCartStore();
  const { data: session, status } = useSession();

  return (
    <motion.nav
      className="flex justify-between items-center py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Link href={"/"}>
        <h1 className="font-extrabold text-xl font-lobster">// Cam.Shop</h1>
      </Link>
      <ul className="flex items-center gap-8">
        {/* Toggle the cart */}
        <li
          onClick={() => {
            cartStore.toggleCart();
          }}
          className="flex items-center text-3xl relative cursor-pointer"
        >
          <AiFillShopping />
          <AnimatePresence>
            {cartStore.cart.length > 0 && (
              <motion.span
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                exit={{ scale: 0 }}
                className="bg-primary text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4
                flex items-center justify-center"
              >
                {cartStore.cart.length}
              </motion.span>
            )}
          </AnimatePresence>
        </li>

        {/* Dark Mode */}
        <DarkLight />

        {/* If the user is not signed in */}
        {!session?.user && (
          <li className="bg-primary text-white py-2 px-4 rounded-md">
            <button onClick={() => signIn()}>Sign In</button>
          </li>
        )}

        {/* If the user is signed in */}
        {session?.user && (
          <li>
            <div className="dropdown dropdown-left dropdown-hover">
              <div className="avatar">
                <Image
                  src={session.user.image as string}
                  alt={session.user.name as string}
                  width={48}
                  height={48}
                  className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                  tabIndex={0}
                />
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content menu space-y-4 shadow bg-base-100 rounded-box w-32"
              >
                <Link
                  className="hover:bg-base-300 p-2 rounded-md font-semibold"
                  href={"/dashboard"}
                  onClick={() => {
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur();
                    }
                  }}
                >
                  Orders
                </Link>
                <li
                  className="hover:bg-base-300 p-2 rounded-md font-semibold cursor-pointer"
                  onClick={() => {
                    signOut();
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur();
                    }
                  }}
                >
                  Sign Out
                </li>
              </ul>
            </div>
          </li>
        )}
      </ul>
    </motion.nav>
  );
}
