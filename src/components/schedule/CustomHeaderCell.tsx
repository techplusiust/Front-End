import { useEffect } from "react";
import moment from "moment-jalaali"; // ایمپورت moment-jalaali

const CustomHeaderCell = ({ date }: { date: any }) => {
  console.log("ffffffffffffff", date);

  useEffect(() => {
    moment.loadPersian({ usePersianDigits: true }); // تنظیمات زبان فارسی و اعداد فارسی
  }, []);

  const persianDay = moment(date._d).format("dddd"); // نمایش نام روز به صورت فارسی
  console.log("CustomHeaderCell: ", persianDay);

  return <span>{persianDay}</span>;
};

export default CustomHeaderCell;
