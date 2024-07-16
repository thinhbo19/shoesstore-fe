"use client";
import RefreshTokenHandler from "@/utils/RefreshTokenHandler";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

const NextAuthProvider = ({ children }) => {
  const [interval, setInterval] = useState(0);

  return (
    <SessionProvider refetchOnWindowFocus={false} refetchInterval={interval}>
      {children}

      <RefreshTokenHandler setInterval={setInterval} />
    </SessionProvider>
  );
};
export default NextAuthProvider;
