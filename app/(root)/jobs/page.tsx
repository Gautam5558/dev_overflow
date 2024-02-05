import AllJobs from "@/components/shared/AllJobs";
import { Metadata } from "next";
import React from "react";

export const metaData: Metadata = {
  title: "Jobs | dev_overflow",
  description:
    "Welcome to our Software Jobs Listing Page – your gateway to exciting career opportunities in the dynamic world of technology and software development! Whether you're a seasoned professional seeking your next challenge or a budding enthusiast eager to embark on your coding journey, our platform connects you with a diverse array of job openings tailored to your skills and interests.",
};

const Jobs = () => {
  return (
    <section className="w-full">
      <div className="w-full">
        <h2 className="text-dark100_light900 h1-bold">Jobs</h2>
        <AllJobs />
      </div>
    </section>
  );
};

export default Jobs;
