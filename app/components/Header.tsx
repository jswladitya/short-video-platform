"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <button onClick={handleSignOut}>SignOut</button>
      {session ? (
        <div>Welcome</div>
      ) : (
        <div>
          <Link href="/login"></Link>
          <Link href="/register"></Link>
        </div>
      )}
    </div>
  );
};

export default Header;
