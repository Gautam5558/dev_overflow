import { getUserTags } from "@/lib/actions/tag.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserCard = async ({ user }: any) => {
  const { tagsRelatedToUser }: any = await getUserTags({
    userId: user._id,
  });

  return (
    <Link
      href={"/profile/" + user.clerkId}
      className="shadow-light100_darknone background-light900_dark200 light-border w-full rounded-2xl border max-xs:min-w-full xs:w-[260px]"
    >
      <div className="  flex  w-full flex-col items-center justify-center  p-8">
        <Image
          src={user.picture}
          width={100}
          height={100}
          alt="userImage"
          className="rounded-[50%]"
        />
        <span className="h3-bold text-dark200_light900 mt-[18px] line-clamp-1 ">
          {user.name}
        </span>
        <span className="text-dark500_light500 body-regular mt-2">
          @{user.username}
        </span>
        <div className="mt-5 flex gap-2">
          {tagsRelatedToUser?.map((tag: any) => {
            return (
              <div
                key={tag}
                className="subtle-medium background-light800_dark400  rounded-[6px] px-4 py-2 text-light-500"
              >
                {tag.name}
              </div>
            );
          })}
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
