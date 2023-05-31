"use client";

import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Nav({ user }: Session) {
  return (
    <nav>
      <h1>Styled</h1>
      <ul>
        <li>Products</li>

        {/* If the user is not signed in */}
        {!user && (
          <li>
            <button onClick={() => signIn()}>Sign In</button>
          </li>
        )}

        {/* If the user is signed in */}
        {user && (
          <li>
            <Image
              src={user?.image as string}
              alt={user?.name as string}
              width={48}
              height={48}
            ></Image>
          </li>
        )}
      </ul>
    </nav>
  );
}
