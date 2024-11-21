import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export const generateTimeSlots = (): string[] => {
  const slots: string[] = [];
  const startTime = new DateObject({
    date: `1403/01/01 07:00`,
    calendar: persian,
    locale: persian_fa,
  });
  const endTime = new DateObject({
    date: `1403/01/01 19:30`,
    calendar: persian,
    locale: persian_fa,
  });

  let currentTime = new DateObject(startTime);
  while (currentTime < endTime) {
    slots.push(currentTime.format("HH:mm"));
    currentTime = currentTime.add(30, "minute");
  }
  return slots;
};
