"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

export default function SignInBtn() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <button
        onClick={() => signIn("google")}
        className="flex items-center gap-4 shadow-xl rounded-lg pl-3"
      >
        <Image src="/google-logo.png" alt="" height={30} width={30} />
        <span className="bg-blue-500 text-white px-4 py-3">
          Sign in with Google
        </span>
      </button>
    </div>
  );
}
