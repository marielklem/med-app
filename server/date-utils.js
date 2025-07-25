import { getDay, addMonths, eachMonthOfInterval, addYears, eachWeekOfInterval, parseISO  } from 'date-fns';

export function getRecurringDates(start, end, frequency) {
  const recurrenceDay = getDay(start);

  if (frequency === 'weekly') {
    return eachWeekOfInterval({start, end}, { weekStartsOn: recurrenceDay })
  } else if (frequency === 'monthly') {
      const dates = [];
      const end = addYears(start, 1)
      let startDate = new Date(start);

      while (startDate <= end) {
        dates.push(startDate)
        console.log(dates)
        startDate.setMonth(startDate.getMonth() + 1)
      }

      console.log(dates)
      return dates;

      //TODO: this way is setting first of month, we need the day respected
      // const end = addYears(start, 1)
      // return eachMonthOfInterval({start, end}, { weekStartsOn: recurrenceDay })
  }
}
