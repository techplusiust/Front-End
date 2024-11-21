import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export const formatDate = (dateStr: string): string => {
  const date = new DateObject({
    date: dateStr,
    format: "YYYY-MM-DD HH:mm:ss",
    calendar: persian,
    locale: persian_fa,
  });
  return date.format("YYYY/MM/DD HH:mm");
};
