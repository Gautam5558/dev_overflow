"use client";
import { Button } from "@/components/ui/button";
import { sideBarContent } from "@/constants";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LeftSidebar = ({ userId }: { userId: string | null }) => {
  const pathname = usePathname();
  return (
    <div className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 flex h-screen w-fit flex-col justify-between gap-4  overflow-y-auto border-r p-6 pt-36 shadow-light-300 max-sm:hidden lg:w-[266px] dark:shadow-none">
      <div className="flex flex-col gap-6">
        {sideBarContent.map((item) => {
          const isActive =
            (pathname.includes(item.path) && item.path.length > 1) ||
            pathname === item.path;
          if (userId) {
            if (item.path === "/profile") {
              item.path = "/profile/" + userId;
            }
          }
          return (
            <Link
              href={item.path}
              key={item.label}
              className={`flex gap-4 p-4 max-lg:items-center max-lg:justify-center ${
                isActive ? "primary-gradient rounded-lg" : ""
              }`}
            >
              <Image
                src={item.icon}
                width={24}
                height={24}
                alt={item.label}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <span
                className={`
                  ${
                    isActive
                      ? "h3-bold text-light-900"
                      : "text-dark300_light900 base-medium"
                  } max-lg:hidden `}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
      <div className=" flex w-full flex-col gap-3">
        <SignedOut>
          <Link href="/sign-in">
            <Button className="background-light800_dark400  h2-semibold w-full rounded-lg px-4 py-3 max-lg:py-4">
              <Image
                src="/assets/icons/account.svg"
                alt="login"
                width={24}
                height={24}
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">Login</span>
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="background-light700_dark400 text-dark400_light900 h2-semibold w-full rounded-lg px-4 py-3 max-lg:py-4">
              <Image
                src="/assets/icons/sign-up.svg"
                alt="login"
                width={24}
                height={24}
                className="invert-colors lg:hidden "
              />
              <span className="max-lg:hidden">Signup</span>
            </Button>
          </Link>
        </SignedOut>
      </div>
    </div>
  );
};

export default LeftSidebar;
