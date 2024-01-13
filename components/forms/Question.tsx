"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useRef, useState } from "react";
import { questionSchema } from "@/lib/utils";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import { createQuestion } from "@/lib/actions/question.action";
import { useRouter } from "next/navigation";

const Question = ({ userId }: { userId: any }) => {
  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });
  const editorRef = useRef(null);
  const navigate = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  async function onSubmit(values: z.infer<typeof questionSchema>) {
    setLoading(true);
    await createQuestion({
      title: values.title,
      content: values.explanation,
      tags: values.tags,
      author: userId,
    });
    setLoading(false);
    navigate.push("/");
  }

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>, field: any) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      const inputTag = e.target as HTMLInputElement;
      const inputValue = inputTag.value.trim();
      if (inputValue !== "") {
        if (inputValue.length > 15) {
          form.setError("tags", {
            type: "required",
            message: "Tag must have less than 15 characters",
          });
          return;
        }
        if (!field.value.includes(inputValue)) {
          form.setValue("tags", [...field.value, inputValue]);
          inputTag.value = "";
          form.clearErrors("tags");
        } else {
          form.setError("tags", {
            type: "required",
            message: "This Tag is already added",
          });
        }
      } else {
        form.setError("tags", { type: "required", message: "Tag not added" });
      }
    }
  };

  const removeTag = (tag: string, field: any) => {
    const filteredTags = field.value.filter((item: string) => {
      return item !== tag;
    });
    form.setValue("tags", filteredTags);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-8 "
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark400_light800 paragraph-semibold">
                  Question Title <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    className="background-light700_dark300 no-focus light-border-2 text-dark300_light700 px-6 py-4 "
                    onChange={(e) => {
                      form.setValue("title", e.target.value);
                    }}
                  />
                </FormControl>
                <FormDescription className="body-regular text-light-500">
                  Be specific and imagine you&apos;re asking a question to
                  another person.
                </FormDescription>
                <FormMessage className="subtle-regular text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="explanation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark400_light800 paragraph-semibold">
                  Detailed explanation of your problem{" "}
                  <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    // @ts-ignore
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue="<p>This is the initial content of the editor.</p>"
                    onEditorChange={(value, editor) => {
                      form.setValue("explanation", value);
                    }}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                      ],
                      toolbar:
                        "undo redo | " +
                        "codesample | bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist ",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                  />
                </FormControl>
                <FormDescription className="body-regular text-light-500">
                  Introduce the problem and expand on what you put in the title.
                  Minimum 20 characters.
                </FormDescription>
                <FormMessage className="subtle-regular text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark400_light800 paragraph-semibold">
                  Tags <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <>
                    <Input
                      placeholder=""
                      className="background-light700_dark300 no-focus light-border-2 text-dark300_light700 px-6 py-4 "
                      onKeyDown={(e) => {
                        addTag(e, field);
                      }}
                    />
                    {field.value.length > 0 && (
                      <div className="flex gap-2.5">
                        {field.value.map((tag: any) => {
                          return (
                            <div
                              key={tag}
                              className="background-light800_dark400  flex gap-1 rounded-[6px] px-4 py-2"
                            >
                              <span className="subtle-medium text-dark-500  dark:text-light-800">
                                {tag}
                              </span>
                              <Image
                                src="/assets/icons/close.svg"
                                alt="remove"
                                width={12}
                                height={12}
                                onClick={(e) => {
                                  removeTag(tag, field);
                                }}
                                className="cursor-pointer"
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                </FormControl>
                <FormDescription className="body-regular text-light-500">
                  Add up to 3 tags to describe what your question is about.
                </FormDescription>

                <FormMessage className="subtle-regular text-red-500" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="primary-gradient paragraph-medium self-end px-4 py-3 text-light-900 disabled:cursor-not-allowed"
            disabled={loading}
          >
            Ask a question
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Question;
