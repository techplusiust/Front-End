import { faker } from "@faker-js/faker";

const firstNames = ["علی", "زهرا", "حسین", "نرگس", "رضا", "سارا", "محمد", "فاطمه"];
const lastNames = ["احمدی", "محمدی", "کاظمی", "جعفری", "رضایی", "نوری", "حسینی", "عباسی"];

export const generateTeachers = (count = 20) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: `${faker.helpers.arrayElement(firstNames)} ${faker.helpers.arrayElement(lastNames)}`,
    subject: faker.helpers.arrayElement([
      "ریاضی",
      "فیزیک",
      "شیمی",
      "زیست‌شناسی",
      "تاریخ",
      "جغرافیا",
      "فلسفه",
      "هنر",
      "زبان انگلیسی",
      "کامپیوتر",
    ]),
    degree: faker.helpers.arrayElement(["دکتری", "کارشناسی ارشد", "کارشناسی"]),
    image: `https://picsum.photos/seed/${Math.random()}/200/200`,
    daysAvailable: faker.helpers.arrayElement([
      "شنبه تا سه‌شنبه",
      "دوشنبه تا پنج‌شنبه",
      "یکشنبه و چهارشنبه",
      "شنبه و سه‌شنبه",
    ]),
    reviews: [], // لیستی از نظرات
  }));
};
