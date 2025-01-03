import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

export const calculateRowSpan = (start: string, duration: number): number => {
  console.log("duration: ", duration);

  const startTime = new DateObject({
    date: `2025/01/01 ${start}`,
    format: "YYYY/MM/DD HH:mm",
    calendar: gregorian, // اضافه کنید
    locale: gregorian_en, // یا هر locale معتبر دیگه
  });

  const startUnix = startTime.unix;
  console.log("startUnix: ", startUnix);
  const endUnix = startTime.add(duration, "hours").unix;
  console.log("endUnix: ", endUnix);
  const diff = endUnix - startUnix;
  console.log("diff: ", diff);

  const diffInMinutes = diff / 60;
  console.log("diffInMinutes: ", diffInMinutes);

  // return diffInMinutes;

  return Math.ceil(diffInMinutes / 30); // Each slot is 30 minutes
};
