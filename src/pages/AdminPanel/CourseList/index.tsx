import React, { useEffect, useState } from "react";
import "./CourseList.css";
import axios from "axios";
import { ICourse } from "../../../models/interface";

const CourseList: React.FC = () => {
  const [coursesData, setCoursesData] = useState<ICourse[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);

  const getCourses = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/courses",

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("response: ", response.data);
        setCoursesData([...response.data]);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "خطای اتصال به سرور. لطفاً دوباره تلاش کنید.";
      console.error("Server connection error:", errorMessage);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const getCourseById = async (courseId: number) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/courses/${courseId}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSelectedCourse(response.data);
      }
    } catch (error: any) {
      console.error(
        "Error fetching course details:",
        error.response?.data?.message || "خطا در دریافت اطلاعات درس."
      );
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const filteredCourses = coursesData.filter((course) =>
    `${course.course_name_fa} ${course.professor_name.fa} ${course.faculty_fa}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // return (
  //   <div className="course-list">
  //     <h1 className="course-list-title">لیست درس‌ها</h1>
  //     <input
  //       type="text"
  //       value={searchTerm}
  //       onChange={(e) => setSearchTerm(e.target.value)}
  //       placeholder="نام درس، استاد یا دانشکده را جستجو کنید..."
  //       className="course-search"
  //     />

  //     <div className="course-cards">
  //       {filteredCourses.length > 0 ? (
  //         filteredCourses.map((course) => (
  //           <div key={course.id} className="course-card">
  //             <h2 className="course-name">{course.course_name_fa}</h2>
  //             <p>
  //               <strong>استاد:</strong> {course.professor_name.fa}
  //             </p>
  //             <p>
  //               <strong>زمان کلاس:</strong> {course.first_day_time}
  //             </p>
  //             <p>
  //               <strong>زمان امتحان:</strong> {course.exam_date}
  //             </p>
  //             <p>
  //               <strong>دانشکده:</strong> {course.faculty_fa}
  //             </p>
  //           </div>
  //         ))
  //       ) : (
  //         <p className="no-results">نتیجه‌ای یافت نشد.</p>
  //       )}
  //     </div>
  //   </div>
  // );

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
              <h2 className="course-name">{course.course_name_fa}</h2>
              <p>
                <strong>استاد:</strong> {course.professor_name.fa}
              </p>
              <button onClick={() => getCourseById(course.id)}>
                مشاهده جزئیات
              </button>

              <p>
                <strong>زمان کلاس:</strong> {course.first_day_of_week}{" "}
                {course.first_day_time}
              </p>
              <p>
                <strong>زمان امتحان:</strong> {course.exam_date}
              </p>
              <p>
                <strong>دانشکده:</strong> {course.faculty_fa}
              </p>

            </div>
          ))
        ) : (
          <p className="no-results">نتیجه‌ای یافت نشد.</p>
        )}
      </div>

      {selectedCourse && (
        <div className="course-details">
          <h2>جزئیات درس</h2>
          <p>
            <strong>نام درس:</strong> {selectedCourse.course_name_fa}
          </p>
          <p>
            <strong>استاد:</strong> {selectedCourse.professor_name.fa}
          </p>
          <p>
            <strong>دانشکده:</strong> {selectedCourse.faculty_fa}
          </p>
          <p>
            <strong>زمان کلاس:</strong> {selectedCourse.first_day_time}
          </p>
          <p>
            <strong>زمان امتحان:</strong> {selectedCourse.exam_date}
          </p>
          <button onClick={() => setSelectedCourse(null)}>بستن</button>
        </div>
      )}
    </div>
  );
};

export default CourseList;
