import Image from "next/image";
import React from "react";

interface StatCardProps {
  imageUrl: string;
  value: number;
  title: string;
}

const StatsCard = ({ imageUrl, value, title }: StatCardProps) => {
  return (
    <div
      className="light-border background-light900_dark300 flex flex-col items-center
        justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200"
    >
      <Image src={imageUrl} alt={title} width={40} height={40} />
      <div className="flex items-center justify-center gap-2">
        <p className="paragraph-semibold text-dark200_light900">{value}</p>
        <p className="body-medium text-dark400_light700">{title}</p>
      </div>
    </div>
  );
};

interface Props {
  totalQuestions: number;
  totalAnswers: number;
}

const Stats = ({ totalQuestions, totalAnswers }: Props) => {
  return (
    <div className="mt-3">
      <h4 className="h3-semibold text-dark200_light900">Stats</h4>
      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <div
          className="light-border background-light900_dark300 flex flex-wrap items-center
            justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200"
        >
          <div className="flex flex-col items-center gap-2">
            <p className="paragraph-semibold text-dark200_light900">
              {totalQuestions}
            </p>
            <p className="body-medium text-dark400_light700">Questions</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="paragraph-semibold text-dark200_light900">
              {totalAnswers}
            </p>
            <p className="body-medium text-dark400_light700">Answers</p>
          </div>
        </div>
        <StatsCard
          imageUrl="/assets/icons/gold-medal.svg"
          value={0}
          title="Gold Badges"
        />
        <StatsCard
          imageUrl="/assets/icons/silver-medal.svg"
          value={0}
          title="Silver Badges"
        />
        <StatsCard
          imageUrl="/assets/icons/bronze-medal.svg"
          value={0}
          title="Bronze Badges"
        />
      </div>
    </div>
  );
};

export default Stats;
