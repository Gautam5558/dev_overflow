import * as z from "zod";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { BADGE_CRITERIA, BadgeCriteriaType, KeyType } from "@/constants";
import { toast } from "react-toastify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const questionSchema = z.object({
  title: z.string().min(5).max(100),
  explanation: z.string().min(10),
  tags: z.array(z.string().min(1).max(10)).min(1).max(3),
});

export const answerSchema = z.object({
  solution: z.string().min(5).max(2000),
});

// Utility function that converts Date object in month year format
export function formatDateToMonthYear(date: Date): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${year}`;
}

export const profileSchema = z.object({
  name: z.string().min(3).max(100),
  username: z.string().min(3).max(100),
  portfolioWebsite: z.string().min(0).max(1000),
  location: z.string().min(0).max(100),
  bio: z.string().min(0).max(1000),
});

export const getUrlFromQuery = (params: any) => {
  const { existingSearchParams, key, value } = params;
  const currentUrl = qs.parse(existingSearchParams);
  currentUrl[key] = value;
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

export const removeQueryFromUrl = (params: any) => {
  const { existingSearchParams, key } = params;
  const currentUrl = qs.parse(existingSearchParams);
  delete currentUrl[key];
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

export const assignBadges = (params: any) => {
  const badgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };
  type BadgeCountsType = keyof typeof badgeCounts;
  const { criteria } = params;
  criteria.forEach((item: { type: string; count: number }) => {
    const { type, count } = item;
    const badgeLevels: BadgeCriteriaType = BADGE_CRITERIA[type as KeyType];
    Object.keys(badgeLevels).forEach((level: any) => {
      if (count >= badgeLevels[level as BadgeCountsType]) {
        badgeCounts[level as BadgeCountsType] =
          badgeCounts[level as BadgeCountsType] + 1;
      }
    });
  });
  return badgeCounts;
};

export const getToast = (title: string, type: any) => {
  const toaster = toast(title, {
    type,
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  return toaster;
};

export function getMostFrequentIds(ids: string[]): string[] {
  // Step 1: Create an object to count the frequency of each ID
  const frequencyMap: { [key: string]: number } = {};

  // Step 2: Iterate through the array of IDs and count the occurrences of each ID
  ids.forEach((id) => {
    frequencyMap[id] = (frequencyMap[id] || 0) + 1;
  });

  // Step 3: Convert the object into an array of objects with ID and frequency
  const idFrequencyArray = Object.entries(frequencyMap).map(
    ([id, frequency]) => ({ id, frequency })
  );

  // Step 4: Sort the array of objects based on frequency in descending order
  idFrequencyArray.sort((a, b) => b.frequency - a.frequency);

  // Step 5: Extract the IDs from the sorted array
  const mostFrequentIds = idFrequencyArray.map((item) => item.id);

  return mostFrequentIds;
}
