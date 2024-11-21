import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export const formatDate = (dateStr: string): string => {
  const date = new DateObject({
    date: new Date(dateStr),
    format: "YYYY-MM-DD HH:mm:ss",
    calendar: persian,
    locale: persian_fa,
  });

  if (!date.isValid) {
    throw new Error("Invalid date format");
  }

  // Convert Persian digits to English digits
  return date
    .format("YYYY/MM/DD HH:mm")
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)));
};
