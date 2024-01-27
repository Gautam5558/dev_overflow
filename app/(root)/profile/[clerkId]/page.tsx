import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/lib/actions/user.action";
import { SignedIn, auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDateToMonthYear } from "@/lib/utils";
import ProfileLink from "@/components/shared/ProfileLink";
import Stats from "@/components/shared/Stats";
import TopPosts from "@/components/shared/TopPosts";
import UserAnswers from "@/components/shared/UserAnswers";

const ProfileDetail = async ({ params }: any) => {
  const { clerkId } = params;
  const { userId } = auth();
  const { user, totalQuestions, totalAnswers }: any = await getUserInfo({
    userId: clerkId,
  });
  return (
    <div>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={user?.picture}
            alt="profile picture"
            width={140}
            height={140}
            className="rounded-[50%] object-cover"
          />
          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">{user.name}</h2>
            <p className="paragraph-regular text-dark200_light800 mt-2">
              @{user.username}
            </p>

            <div className="my-3 flex flex-wrap items-center justify-start gap-5">
              {user.portfolioWebsite && (
                <ProfileLink
                  icon="/assets/icons/link.svg"
                  href={user.portfolioWebsite}
                  title="Portfolio"
                />
              )}
              {user.location && (
                <ProfileLink
                  icon="/assets/icons/location.svg"
                  title={user.location}
                />
              )}
              <ProfileLink
                icon="/assets/icons/calendar.svg"
                title={`Joined ${formatDateToMonthYear(user.joinedAt)}`}
              />
            </div>
            {user.bio && <p>{user.bio}</p>}
          </div>
        </div>
        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === userId && (
              <Link href="/profile/edit">
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px]">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      <Stats totalQuestions={totalQuestions} totalAnswers={totalAnswers} />
      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger className="tab" value="top-posts">
              Top Posts
            </TabsTrigger>
            <TabsTrigger className="tab" value="answers">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts" className="mt-4">
            <TopPosts userId={user._id} />
          </TabsContent>
          <TabsContent value="answers" className="mt-4">
            <UserAnswers userId={user._id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileDetail;
