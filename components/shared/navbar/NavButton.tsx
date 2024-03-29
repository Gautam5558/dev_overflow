"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { sideBarContent } from "@/constants";
import { usePathname } from "next/navigation";

const SideBarContent = () => {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col gap-6 pt-16">
      {sideBarContent.map((item) => {
        const isActive =
          (pathname.includes(item.path) && item.path.length > 1) ||
          pathname === item.path;
        return (
          <SheetClose asChild key={item.label}>
            <Link
              href={item.path}
              className={`
              ${
                isActive
                  ? "primary-gradient gap-3 rounded-lg text-light-900"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent p-4 `}
            >
              <Image
                src={item.icon}
                width={20}
                height={20}
                alt={item.label}
                className={isActive ? "" : "invert-colors"}
              />
              <span className={isActive ? "base-bold" : "base-medium"}>
                {item.label}
              </span>
            </Link>
          </SheetClose>
        );
      })}
    </div>
  );
};

const NavButton = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Image
          src="/assets/icons/hamburger.svg"
          width={36}
          height={36}
          alt="menuButton"
          className="invert-colors min-h-9 min-w-9 sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/images/site-logo.svg"
            width={23}
            height={23}
            alt="dev_overflow"
          />
          <span className="h2-bold text-dark100_light900 font-spaceGrotesk">
            Dev<span className="text-primary-500">Overflow</span>
          </span>
        </Link>
        <div>
          <SheetClose asChild>
            <SideBarContent />
          </SheetClose>

          <SignedOut>
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button
                    className="small-medium btn-secondary
                    min-h-[41px]  w-full rounded-lg px-4 py-3 shadow-none"
                  >
                    <span className="primary-text-gradient">Login</span>
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button
                    className="small-medium btn-tertiary
                    text-dark400_light900  min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
                  >
                    Signup
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavButton;
