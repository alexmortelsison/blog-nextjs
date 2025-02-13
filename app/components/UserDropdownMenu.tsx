"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import SignoutButton from "./SignoutButton";
import { Separator } from "@/components/ui/separator";
import SigninButton from "./SigninButton";
import { useSession } from "next-auth/react";

export default function UserDropdownMenu() {
  const { data: session } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MenuIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full flex flex-col justify-center pt-4">
        <DropdownMenu>
          <h1 className="font-mono flex justify-center pb-4 text-lg font-bold">
            social.
          </h1>
        </DropdownMenu>
        <DropdownMenuItem className="flex justify-center">
          <Link href={"/"}>Home</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-center">
          <Link href={"/about"}>About</Link>
        </DropdownMenuItem>
        <Separator className="my-2" />
        <DropdownMenuItem className="flex justify-center pt-4">
          {!session ? <SigninButton /> : <SignoutButton />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
