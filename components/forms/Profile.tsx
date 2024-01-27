"use client";
import { profileSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { updateUserEdit } from "@/lib/actions/user.action";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    bio: string;
    portfolioWebsite: string;
    name: string;
    username: string;
    location: string;
  };
}

const Profile = ({ user }: Props) => {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      username: user.username,
      portfolioWebsite: user.portfolioWebsite ? user.portfolioWebsite : "",
      location: user.location ? user.location : "",
      bio: user.bio ? user.bio : "",
    },
  });
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();
  const path = usePathname();

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    setLoading(true);
    await updateUserEdit({
      name: values.name,
      username: values.username,
      portfolioWebsite: values.portfolioWebsite,
      location: values.location,
      bio: values.bio,
      userId: user._id,
      path,
    });
    setLoading(false);
    navigate.push("/");
  }

  return (
    <div className="mt-7">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-9"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark400_light800 paragraph-semibold">
                  Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    name="name"
                    value={form.getValues("name")}
                    onChange={(e) => {
                      form.setValue("name", e.target.value);
                    }}
                    className="background-light800_dark300 text-dark300_light900 no-focus light-border-2 min-h-[56px] rounded-[6px] border px-6 py-4"
                  />
                </FormControl>
                <FormMessage className="subtle-regular text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark400_light800 paragraph-semibold">
                  Username <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    name="username"
                    value={form.getValues("username")}
                    onChange={(e) => {
                      form.setValue("username", e.target.value);
                    }}
                    className="background-light800_dark300 text-dark300_light900 no-focus light-border-2 min-h-[56px] rounded-[6px] border px-6 py-4"
                  />
                </FormControl>
                <FormMessage className="subtle-regular text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="portfolioWebsite"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark400_light800 paragraph-semibold">
                  Porfolio Link
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Link"
                    type="text"
                    name="portfolioWebsite"
                    value={form.getValues("portfolioWebsite")}
                    onChange={(e) => {
                      form.setValue("portfolioWebsite", e.target.value);
                    }}
                    className="background-light800_dark300  text-dark300_light900 no-focus light-border-2 min-h-[56px] rounded-[6px] border px-6 py-4"
                  />
                </FormControl>
                <FormMessage className="subtle-regular text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark400_light800 paragraph-semibold">
                  Location
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Where are you from ?"
                    type="text"
                    name="name"
                    value={form.getValues("location")}
                    onChange={(e) => {
                      form.setValue("location", e.target.value);
                    }}
                    className="background-light800_dark300 no-focus  text-dark300_light900 light-border-2 min-h-[56px] rounded-[6px] border px-6 py-4"
                  />
                </FormControl>
                <FormMessage className="subtle-regular text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark400_light800 paragraph-semibold">
                  Bio
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about yourself."
                    name="bio"
                    value={form.getValues("bio")}
                    onChange={(e) => {
                      form.setValue("bio", e.target.value);
                    }}
                    className="background-light800_dark300 light-border-2  text-dark300_light900 no-focus min-h-[56px] rounded-[6px] border px-6 py-4"
                  />
                </FormControl>
                <FormMessage className="subtle-regular text-red-500" />
              </FormItem>
            )}
          />
          <Button
            disabled={loading}
            type="submit"
            className="primary-gradient w-fit min-w-[150px] self-end rounded-[8px] px-3 py-4 text-light-900"
          >
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Profile;
