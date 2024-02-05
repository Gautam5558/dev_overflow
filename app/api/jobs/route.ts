import { NextResponse } from "next/server";
export const POST = async (request: Request) => {
  const body = await request.json();
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "74e146aa42mshdcc86d4e2165e21p1521d1jsn9b5c537aa133",
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
