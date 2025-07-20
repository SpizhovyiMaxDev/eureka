import { differenceInDays, formatDistance, parseISO } from "date-fns";

export const getNumberOfDaysBetweenDates = (
  date1: string | Date,
  date2: string | Date
): number => {
  return differenceInDays(normalizeDate(date1), normalizeDate(date2));
};

const normalizeDate = (date: string | Date) =>
  typeof date === "string" ? parseISO(date) : date;

export const getTimePassedOrRemaining = (dateStr: string): string =>
  formatDistance(parseISO(dateStr), new Date(), { addSuffix: true })
    .replace("about ", "")
    .replace("in", "In");

export const getUTCTodayAtStartOrEndOfDay = (options?: {
  end?: boolean;
}): string => {
  const hours: [number, number, number, number] = options?.end
    ? [23, 59, 59, 999]
    : [0, 0, 0, 0];

  const now = new Date();
  now.setUTCHours(...hours);
  return now.toISOString();
};
