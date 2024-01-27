import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  icon: string;
  title: string;
  href?: string;
}

const ProfileLink = ({ icon, title, href }: Props) => {
  return (
    <div className="flex items-center gap-1">
      <Image src={icon} alt="iconImage" width={20} height={20} />
      {href ? (
        <Link
          href={href}
          target="_blank"
          className="paragraph-medium text-blue-500"
        >
          {title}
        </Link>
      ) : (
        <p className="paragraph-medium text-dark400_light700">{title}</p>
      )}
    </div>
  );
};

export default ProfileLink;
