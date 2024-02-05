import { NextResponse } from "next/server";
export const POST = async (request: Request) => {
  const body = await request.json();
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_JOBS_API_KEY,
      "X-RapidAPI-Host": "jobs-api14.p.rapidapi.com",
    },
  };
  try {
    const res = await fetch(
      "https://jobs-api14.p.rapidapi.com/list?query=" +
        body.search +
        "&location=" +
        "India",
      options
    );

    const data = await res.json();
    return NextResponse.json({ data });
  } catch (err) {
    console.log(err);
  }
};
