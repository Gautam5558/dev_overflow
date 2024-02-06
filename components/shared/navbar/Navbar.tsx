import Link from "next/link";
import React from "react";
import Image from "next/image";
import { SignedIn, UserButton } from "@clerk/nextjs";
import ToggleButton from "./ToggleButton";
import NavButton from "./NavButton";
import GlobalSearch from "../search/GlobalSearch";

const Navbar = () => {
  return (
    <nav
      className="flex-between background-light900_dark200 fixed z-50
    w-full gap-5 p-6 shadow-light-300 sm:px-12 dark:shadow-none"
    >
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/images/site-logo.svg"
          height={24}
          width={24}
          alt="dev_overflow"
          className="min-h-6 min-w-6"
        />
        <p
          className="h2-bold font-spaceGrotesk text-dark-100
          dark:text-light-900"
        >
          Dev<span className="text-primary-500">Overflow</span>
        </p>
      </Link>
      <GlobalSearch />
      <div className="flex-between gap-5">
        <ToggleButton />
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>
        <NavButton />
      </div>
    </nav>
  );
};

export default Navbar;
