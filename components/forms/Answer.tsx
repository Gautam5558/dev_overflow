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
import { answerSchema, getToast } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThemeContext } from "@/context/ThemeProvider";
import Image from "next/image";
import { createAnswer } from "@/lib/actions/answer.action";
import { usePathname } from "next/navigation";

const Answer = ({
  questionId,
  clerkId,
  question,
}: {
  questionId: string;
  clerkId: string | null;
  question: object;
}) => {
  const { theme }: any = useContext(ThemeContext);

  const form = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      solution: "",
    },
  });
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const editorRef = useRef();

  async function onSubmit(values: z.infer<typeof answerSchema>) {
    setLoading(true);
    await createAnswer({
      content: values.solution,
      questionId,
      clerkId,
      path: pathname,
    });
    getToast("Answer created successfully", "success");
    const editor = editorRef?.current as any;
    editor.setContent("");
    setLoading(false);
  }

  const handleGeneratingAnswer = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      setAiLoading(true);
      const res = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URL + "api/chatgpt",
        {
          method: "POST",
          headers: {
            "Content-TYpe": "application/json",
          },
          body: JSON.stringify({ question }),
        }
      );

      const data = await res.json();
      setAiLoading(false);
      console.log(data);
      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent(data.result);
      }
    } catch (err) {
      console.log(err);
      setAiLoading(false);
      getToast("Upgrade to Pro plan to generate AI response", "error");
      setError(
        "(You are on Vercel's free plan which has a default maximum timeout of 10 seconds for serverless functions, including API requests.For AI response upgrade to Pro plan of vercel)"
      );
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <span className="text-dark400_light800 paragraph-semibold">
          Write your answer here
        </span>
        <Button
          disabled={aiLoading}
          className="background-light800_dark300 flex items-center justify-center gap-1 rounded-[5px] px-4 py-2.5 disabled:cursor-not-allowed"
          onClick={(e) => handleGeneratingAnswer(e)}
        >
          <Image
            src="/assets/icons/stars.svg"
            width={12}
            height={12}
            alt="starsImg"
          />
          <span className="subtle-medium primary-text-gradient">
            {aiLoading === false ? "Generate AI Answer" : "Generating"}
          </span>
        </Button>
      </div>
      {error && (
        <span className="subtle-medium my-5 text-red-500">{error}</span>
      )}
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
