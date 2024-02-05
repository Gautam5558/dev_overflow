"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useContext, useRef, useState } from "react";
import { getToast, questionSchema } from "@/lib/utils";
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
import { createQuestion, updateQuestion } from "@/lib/actions/question.action";
import { usePathname, useRouter } from "next/navigation";
import { ThemeContext } from "@/context/ThemeProvider";
// import parse from "html-react-parser";

const Question = ({
  userId,
  questionData,
}: {
  userId: any;
  questionData?: any;
}) => {
  const { theme }: any = useContext(ThemeContext);

  const questionDataTags = [];
  if (questionData) {
    for (let i = 0; i < questionData.tags.length; i++) {
      const tagName = questionData.tags[i].name;
      questionDataTags.push(tagName);
    }
  }

  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: questionData ? questionData.title : "",
      explanation: questionData ? questionData.content : "",
      tags: questionData ? questionDataTags : [],
    },
  });
  const editorRef = useRef(null);
  const navigate = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const path = usePathname();
  async function onSubmit(values: z.infer<typeof questionSchema>) {
    if (questionData) {
      setLoading(true);
      await updateQuestion({
        title: values.title,
        content: values.explanation,
        tags: values.tags,
        path,
        questionId: questionData._id,
      });
      setLoading(false);
      getToast("Question updated successfully", "success");
      navigate.push("/");
    } else {
      setLoading(true);
      await createQuestion({
        title: values.title,
        content: values.explanation,
        tags: values.tags,
        author: userId,
        path,
      });
      setLoading(false);
      getToast("Question created successfully", "success");
      navigate.push("/");
    }
  }

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>, field: any) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      const inputTag = e.target as HTMLInputElement;
      let inputValue = inputTag.value.trim();

      // Capitalizing 1st letter of the tag
      const firstLetter = inputValue.charAt(0);

      const firstLetterCap = firstLetter.toUpperCase();

      const remainingLetters = inputValue.slice(1);

      const remainingLettersLowerCase = remainingLetters.toLowerCase();

      const capitalizedFirstChar = firstLetterCap + remainingLettersLowerCase;

      inputValue = capitalizedFirstChar;

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
                    value={form.getValues("title")}
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
                    initialValue={
                      questionData
                        ? form.getValues("explanation")
                        : "<p>This is the initial content of the editor.</p>"
                    }
                    onEditorChange={(value, editor) => {
                      form.setValue("explanation", value);
                    }}
                    init={{
                      skin: theme === "dark" ? "oxide-dark" : "oxide",
                      content_css: theme === "dark" ? "dark" : "default",
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
            {questionData
              ? loading === true
                ? "Editing..."
                : "Edit question"
              : loading === true
                ? "Creating..."
                : "Ask a question"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Question;
