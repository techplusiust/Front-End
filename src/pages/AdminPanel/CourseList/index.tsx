import React, { useState } from "react";
import "./CourseList.css";
interface Course {
  id: number;
  name: string;
  schedule: string;
  exam: string;
  professor: string;
  faculty: string;
}
const coursesData: Course[] = [
    { id: 1, name: "ریاضیات مهندسی", schedule: "یکشنبه و سه‌شنبه - ساعت 10 تا 12", exam: "20 تیر - ساعت 09:00", professor: "دکتر علی حسینی", faculty: "دانشکده فنی" },
    { id: 2, name: "مدارهای الکتریکی", schedule: "دوشنبه و چهارشنبه - ساعت 14 تا 16", exam: "15 تیر - ساعت 14:00", professor: "دکتر زهرا احمدی", faculty: "دانشکده فنی" },
    { id: 3, name: "فیزیک 1", schedule: "یکشنبه و سه‌شنبه - ساعت 08 تا 10", exam: "18 تیر - ساعت 08:00", professor: "دکتر مهدی کاظمی", faculty: "دانشکده علوم پایه" },
    { id: 4, name: "زبان تخصصی", schedule: "شنبه و سه‌شنبه - ساعت 10 تا 12", exam: "21 تیر - ساعت 09:00", professor: "دکتر احمدی", faculty: "دانشکده علوم انسانی" },
    { id: 5, name: "شیمی عمومی", schedule: "دوشنبه و چهارشنبه - ساعت 08 تا 10", exam: "19 تیر - ساعت 11:00", professor: "دکتر فرزاد شریعتی", faculty: "دانشکده علوم پایه" },
    { id: 6, name: "مبانی کامپیوتر", schedule: "یکشنبه و سه‌شنبه - ساعت 10 تا 12", exam: "22 تیر - ساعت 09:00", professor: "دکتر محمدی", faculty: "دانشکده فنی" },
    { id: 7, name: "هوش مصنوعی", schedule: "دوشنبه و چهارشنبه - ساعت 14 تا 16", exam: "10 تیر - ساعت 14:00", professor: "دکتر حسین زاده", faculty: "دانشکده فنی" },
    { id: 8, name: "معادلات دیفرانسیل", schedule: "شنبه و دوشنبه - ساعت 08 تا 10", exam: "18 تیر - ساعت 08:00", professor: "دکتر جعفری", faculty: "دانشکده علوم پایه" },
    { id: 9, name: "زبان برنامه‌نویسی", schedule: "یکشنبه و سه‌شنبه - ساعت 14 تا 16", exam: "15 تیر - ساعت 11:00", professor: "دکتر فاطمه علیزاده", faculty: "دانشکده فنی" },
    { id: 10, name: "آمار و احتمال", schedule: "دوشنبه و چهارشنبه - ساعت 10 تا 12", exam: "16 تیر - ساعت 09:00", professor: "دکتر حسینی", faculty: "دانشکده علوم پایه" },
    { id: 11, name: "گرافیک کامپیوتری", schedule: "شنبه و سه‌شنبه - ساعت 08 تا 10", exam: "12 تیر - ساعت 09:00", professor: "دکتر مرادی", faculty: "دانشکده فنی" },
    { id: 12, name: "ساختمان داده‌ها", schedule: "یکشنبه و چهارشنبه - ساعت 14 تا 16", exam: "20 تیر - ساعت 14:00", professor: "دکتر حیدری", faculty: "دانشکده فنی" },
    { id: 13, name: "سیستم‌های عامل", schedule: "یکشنبه و سه‌شنبه - ساعت 10 تا 12", exam: "25 تیر - ساعت 09:00", professor: "دکتر علوی", faculty: "دانشکده فنی" },
    { id: 14, name: "مهندسی نرم‌افزار", schedule: "دوشنبه و چهارشنبه - ساعت 08 تا 10", exam: "19 تیر - ساعت 08:00", professor: "دکتر محسنی", faculty: "دانشکده فنی" },
    { id: 15, name: "پایگاه داده‌ها", schedule: "شنبه و سه‌شنبه - ساعت 14 تا 16", exam: "13 تیر - ساعت 09:00", professor: "دکتر ملکی", faculty: "دانشکده فنی" },
    { id: 16, name: "شبکه‌های کامپیوتری", schedule: "دوشنبه و چهارشنبه - ساعت 10 تا 12", exam: "17 تیر - ساعت 10:00", professor: "دکتر عباسی", faculty: "دانشکده فنی" },
    { id: 17, name: "مدیریت پروژه", schedule: "شنبه و دوشنبه - ساعت 08 تا 10", exam: "22 تیر - ساعت 14:00", professor: "دکتر نعمتی", faculty: "دانشکده مدیریت" },
    { id: 18, name: "مدار منطقی", schedule: "یکشنبه و سه‌شنبه - ساعت 10 تا 12", exam: "18 تیر - ساعت 10:00", professor: "دکتر رضوی", faculty: "دانشکده فنی" },
    { id: 19, name: "ریاضی عمومی 1", schedule: "شنبه و دوشنبه - ساعت 10 تا 12", exam: "14 تیر - ساعت 09:00", professor: "دکتر امینی", faculty: "دانشکده علوم پایه" },
    { id: 20, name: "ریاضی عمومی 2", schedule: "یکشنبه و سه‌شنبه - ساعت 14 تا 16", exam: "15 تیر - ساعت 14:00", professor: "دکتر کاظمی", faculty: "دانشکده علوم پایه" },
    { id: 21, name: "الگوریتم‌های پیشرفته", schedule: "شنبه و چهارشنبه - ساعت 08 تا 10", exam: "21 تیر - ساعت 08:00", professor: "دکتر احمدی", faculty: "دانشکده فنی" },
    { id: 22, name: "بینایی ماشین", schedule: "یکشنبه و سه‌شنبه - ساعت 10 تا 12", exam: "18 تیر - ساعت 10:00", professor: "دکتر علی‌زاده", faculty: "دانشکده فنی" },
    { id: 23, name: "کامپایلرها", schedule: "دوشنبه و چهارشنبه - ساعت 10 تا 12", exam: "20 تیر - ساعت 14:00", professor: "دکتر محمدی", faculty: "دانشکده فنی" },
    { id: 24, name: "طراحی دیجیتال", schedule: "یکشنبه و سه‌شنبه - ساعت 08 تا 10", exam: "17 تیر - ساعت 08:00", professor: "دکتر حسینی", faculty: "دانشکده فنی" },
    { id: 25, name: "برنامه‌نویسی وب", schedule: "شنبه و دوشنبه - ساعت 14 تا 16", exam: "13 تیر - ساعت 10:00", professor: "دکتر کریمی", faculty: "دانشکده فنی" },
    { id: 26, name: "امنیت اطلاعات", schedule: "یکشنبه و چهارشنبه - ساعت 10 تا 12", exam: "19 تیر - ساعت 09:00", professor: "دکتر محمدی", faculty: "دانشکده فنی" },
    { id: 27, name: "تجارت الکترونیک", schedule: "دوشنبه و چهارشنبه - ساعت 14 تا 16", exam: "16 تیر - ساعت 14:00", professor: "دکتر رهنما", faculty: "دانشکده مدیریت" },
    { id: 28, name: "روش تحقیق", schedule: "شنبه و سه‌شنبه - ساعت 10 تا 12", exam: "20 تیر - ساعت 11:00", professor: "دکتر علوی", faculty: "دانشکده علوم انسانی" },
    { id: 29, name: "تحلیل و طراحی سیستم‌ها", schedule: "یکشنبه و چهارشنبه - ساعت 08 تا 10", exam: "18 تیر - ساعت 08:00", professor: "دکتر احمدی", faculty: "دانشکده فنی" },
    { id: 30, name: "مدیریت منابع انسانی", schedule: "شنبه و دوشنبه - ساعت 10 تا 12", exam: "21 تیر - ساعت 14:00", professor: "دکتر قاسمی", faculty: "دانشکده مدیریت" }
  ];
  
const CourseList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const filteredCourses = coursesData.filter((course) =>
    `${course.name} ${course.professor} ${course.faculty}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  return (
    <div className="course-list">
      <h1 className="course-list-title">لیست درس‌ها</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="نام درس، استاد یا دانشکده را جستجو کنید..."
        className="course-search"
      />
      <div className="course-cards">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div key={course.id} className="course-card">
              <h2 className="course-name">{course.name}</h2>
              <p><strong>استاد:</strong> {course.professor}</p>
              <p><strong>زمان کلاس:</strong> {course.schedule}</p>
              <p><strong>زمان امتحان:</strong> {course.exam}</p>
              <p><strong>دانشکده:</strong> {course.faculty}</p>
            </div>
          ))
        ) : (
          <p className="no-results">نتیجه‌ای یافت نشد.</p>
        )}
      </div>
    </div>
  );
};
export default CourseList;