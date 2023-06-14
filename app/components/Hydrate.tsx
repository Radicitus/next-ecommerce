"use client";

import { ReactNode, useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";

export default function Hydrate({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait until NextJS rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <SessionProvider>
      {isHydrated ? (
        <>{children}</>
      ) : (
        <div className="h-full flex justify-center content-center absolute inset-0">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      )}
    </SessionProvider>
  );
}
