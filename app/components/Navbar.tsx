/* eslint-disable @next/next/no-img-element */
"use client";
import { useSession } from "next-auth/react";
import UserDropdownMenu from "./UserDropdownMenu";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <div className="flex justify-between items-center border-b p-4 lg:max-w-6xl mx-auto">
      <h1 className="text-lg font-mono tracking-wide font-bold">social.</h1>
      <div className="flex items-center gap-x-2 border px-4 py-2 rounded-full">
        <UserDropdownMenu />
        <img
          src={
            session?.user?.image ||
            "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg/v1/fill/w_300,h_300,q_75,strp/default_user_icon_4_by_karmaanddestiny_de7834s-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzAwIiwicGF0aCI6IlwvZlwvMjcxZGVlYTgtZTI4Yy00MWEzLWFhZjUtMjkxM2Y1ZjQ4YmU2XC9kZTc4MzRzLTY1MTViZDQwLThiMmMtNGRjNi1hODQzLTVhYzFhOTVhOGI1NS5qcGciLCJ3aWR0aCI6Ijw9MzAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.W7L0Rf_YqFzX9yxDfKtIMFnnRFdjwCHxi7xeIISAHNM"
          }
          alt=""
          className="h-8 w-8 rounded-full"
        />
      </div>
    </div>
  );
}

//  ;
