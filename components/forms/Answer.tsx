"use client";
import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Editor } from "@tinymce/tinymce-react";
import { z } from "zod";
import { answerSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThemeContext } from "@/context/ThemeProvider";
import Image from "next/image";
import { createAnswer } from "@/lib/actions/answer.action";
import { usePathname } from "next/navigation";

const Answer = ({
  questionId,
  clerkId,
}: {
  questionId: string;
  clerkId: string | null;
}) => {
  const form = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      solution: "",
    },
  });
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const { theme }: any = useContext(ThemeContext);

  const editorRef = useRef();

  async function onSubmit(values: z.infer<typeof answerSchema>) {
    setLoading(true);
    await createAnswer({
      content: values.solution,
      questionId,
      clerkId,
      path: pathname,
    });
    const editor = editorRef?.current as any;
    editor.setContent("");
    setLoading(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-dark400_light800 paragraph-semibold">
          Write your answer here
        </span>
        <Button className="background-light800_dark300 flex items-center justify-center gap-1 rounded-[5px] px-4 py-2.5">
          <Image
            src="/assets/icons/stars.svg"
            width={12}
            height={12}
            alt="starsImg"
          />
          <span className="subtle-medium primary-text-gradient">
            Generate AI Answer
          </span>
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-8"
        >
          <FormField
            control={form.control}
            name="solution"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    // @ts-ignore
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue="<p>This is the initial content of the editor.</p>"
                    onEditorChange={(value, editor) => {
                      form.setValue("solution", value);
                    }}
                    value={form.getValues("solution")}
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
                      skin: theme === "dark" ? "oxide-dark" : "oxide",
                      content_css: theme === "dark" ? "dark" : "light",
                      toolbar:
                        "undo redo | " +
                        "codesample | bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist ",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                  />
                </FormControl>
                <FormMessage className="small-medium text-red-500 " />
              </FormItem>
            )}
          />
          <Button
            className="primary-gradient paragraph-medium w-fit self-end rounded-[8px] px-4 py-3 text-light-900 disabled:cursor-not-allowed "
            type="submit"
            disabled={loading}
          >
            Post Answer
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Answer;
