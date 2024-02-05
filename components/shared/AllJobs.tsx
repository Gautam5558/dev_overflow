"use client";
import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import Image from "next/image";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";

const Loading = () => {
  return (
    <section className="">
      <div className="flex flex-col gap-6">
        {new Array(10).fill(1, 0, 9).map((item, index) => {
          return (
            <Skeleton
              key={index}
              className="skeleton-color h-44 rounded-[10px]"
            />
          );
        })}
      </div>
    </section>
  );
};

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetching = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(
          process.env.NEXT_PUBLIC_SERVER_URL + "api/jobs",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              search: search === "" ? "Web Developer" : search,
            }),
          }
        );
        const { data } = await res.json();
        console.log(data);
        setLoading(false);
        setJobs(data.jobs);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(fetching);
  }, [search]);

  return (
    <div className=" mt-[30px] flex w-full flex-col gap-[30px]">
      <div className="flex w-full justify-between ">
        <div className="dark:dark-gradient flex min-h-[56px] w-full gap-4 rounded-[10px]  bg-light-800 p-4">
          <Image
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
          />{" "}
          <Input
            value={search}
            type="text"
            placeholder="Search for job keywords"
            className=" no-focus placeholder paragraph-regular text-dark400_light700  border-0 border-none  bg-transparent  shadow-none outline-none"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>
      {loading === true ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-col gap-6">
            {jobs.map((job: any) => {
              return <JobCard job={job} key={job.id} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default AllJobs;
