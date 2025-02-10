"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function SigninButton() {
  return <Button onClick={() => signIn()}>Login</Button>;
}
