import { getDay, eachWeekOfInterval, eachDayOfInterval, format } from "date-fns";

export function getRecurringDates(start, end, frequency) {
  const recurrenceDay = getDay(start);

  let dateArray;
  if (frequency === "daily") {
    dateArray = eachDayOfInterval({ start, end });
  } else if (frequency === "weekly") {
    dateArray = eachWeekOfInterval({ start, end }, { weekStartsOn: recurrenceDay });
  }

  return dateArray.map(date => format(date, 'yyyy-MM-dd'))
  // return dateArray
}
