import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const NoResult = ({ text, paragraph, buttonLink, buttonText }: any) => {
  return (
    <div className="m-auto mt-10 flex w-full flex-col items-center gap-[30px]">
      <Image
        src={"/assets/images/light-illustration.png"}
        alt="No Results"
        width={270}
        height={200}
        className="dark:hidden"
      />
      <Image
        src={"/assets/images/dark-illustration.png"}
        alt="No Results"
        width={270}
        height={200}
        className="hidden dark:inline-block "
      />
      <div className="mt-[30px] flex flex-col items-center gap-3.5 text-center">
        <h3 className="h3-bold text-dark200_light900">
          There’s no {text} to show
        </h3>
        <p className="text-dark500_light700 body-regular max-w-[350px]">
          {paragraph}
        </p>
        <Link href={buttonLink}>
          <Button className="primary-gradient paragraph-medium px-4 py-3 text-light-900">
            {buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NoResult;
