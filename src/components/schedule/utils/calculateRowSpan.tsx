import DateObject from "react-date-object";

export const calculateRowSpan = (start: string, end: string): number => {
  const startTime = new DateObject({
    date: `1403/01/01 ${start}`,
    format: "YYYY/MM/DD HH:mm",
  });
  const endTime = new DateObject({
    date: `1403/01/01 ${end}`,
    format: "YYYY/MM/DD HH:mm",
  });

  const diffInMinutes =
    (endTime.toDate().getTime() - startTime.toDate().getTime()) / (1000 * 60);
  return Math.ceil(diffInMinutes / 30); // Each slot is 30 minutes
};
