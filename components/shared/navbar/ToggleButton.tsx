"use client";

import React, { useContext } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";
import { ThemeContext } from "@/context/ThemeProvider";
import { dropdownContent } from "@/constants";

const ToggleButton = () => {
  const { theme, setTheme } = useContext<any>(ThemeContext);

  const handleClick = (value: string) => {
    if (value === "system") {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    } else {
      setTheme(value);
    }
  };
  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger
          className="min-h-5 
        min-w-5
        cursor-pointer focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200"
        >
          <Image
            src={
              theme === "dark"
                ? "/assets/icons/moon.svg"
                : "/assets/icons/sun.svg"
            }
            width={20}
            height={20}
            alt={theme === "dark" ? "moon" : "sun"}
            className="active-theme min-h-5 
            min-w-5"
          />
        </MenubarTrigger>
        <MenubarContent
          className="absolute right-[-1rem] mt-3 min-w-[120px] rounded border bg-light-900
        py-2 dark:border-dark-400 dark:bg-dark-300"
        >
          {dropdownContent.map((item) => {
            return (
              <MenubarItem
                key={item.value}
                className="flex cursor-pointer items-center gap-4
              px-2.5 py-2 dark:focus:bg-dark-400"
                onClick={() => {
                  handleClick(item.value);
                }}
              >
                <Image
                  src={item.icon}
                  width={16}
                  height={16}
                  alt={item.label}
                  className={`${theme === item.value && "active-theme"}`}
                />
                <span
                  className={`body-semibold text-light-500 ${
                    theme === item.value
                      ? "text-primary-500"
                      : "text-dark100_light900"
                  } `}
                >
                  {item.label}
                </span>
              </MenubarItem>
            );
          })}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default ToggleButton;
