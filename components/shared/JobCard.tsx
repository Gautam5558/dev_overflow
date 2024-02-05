import Image from "next/image";
import Link from "next/link";
import React from "react";
interface Props {
  job: {
    image: string;
    title: string;
    company: string;
    description: string;
    employmentType: string;
    datePosted: string;
    location: string;
    jobProviders: { jobProvider: string; url: string }[];
  };
}

const JobCard = ({ job }: Props) => {
  return (
    <div
      className="dark:dark-gradient shadow-light100_dark100 flex flex-col gap-3.5 rounded-[10px]
  border bg-light-900 px-11 py-9"
    >
      <div className="flex justify-between gap-4">
        <div className="flex flex-[4] flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="base-semibold text-dark200_light900">
              {job?.title.length > 45
                ? job?.title.slice(0, 45) + "..."
                : job?.title}
            </h3>
            <span className="text-dark300_light900 background-light800_dark400 subtle-medium max-w-max rounded-[4px]  px-5 py-2">
              {job?.company.slice(0, 10)}...
            </span>
          </div>
          <p className="small-regular text-dark500_light500">
            {job?.description.slice(0, 100)}...
          </p>
          <div className="flex items-center gap-3">
            <span className="small-medium text-light-500">
              ({job?.employmentType})
            </span>
            <span className="small-medium text-light-500">
              Listed {job?.datePosted}
            </span>
          </div>
        </div>
        <div className="flex flex-[1] flex-col justify-between text-right">
          <p className="body-semibold text-dark200_light900 self-end">
            {job?.location}
          </p>
          <Link
            href={job?.jobProviders[0]?.url}
            target="_blank"
            className="primary-text-gradient body-semibold flex items-center gap-2 self-end"
          >
            <span>View Job</span>
            <Image
              src="/assets/icons/arrow-up-right.svg"
              alt="link"
              width={18}
              height={18}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
