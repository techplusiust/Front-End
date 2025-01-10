import { useEffect, useState } from "react";
import { generateTimeSlots } from "./utils/generateTimeSlots";
import { Selection } from "@nextui-org/react";
import { ICourse, IFaculties } from "../../models/interface";
import axios from "axios";

const Logic = () => {
  const [facultiesData, setFacultiesData] = useState<IFaculties[]>([]);
  const [coursesData, setCoursesData] = useState<ICourse[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [selectedLesson, setSelectedLesson] = useState<Selection>(new Set());
  const [selectedClassTimes, setSelectedClassTimes] = useState<{
    [key: string]: Set<number>;
  }>({});

  const getFaculties = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/professors/faculties",

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("response: ", response.data);
        setFacultiesData([...response.data.faculties]);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "خطای اتصال به سرور. لطفاً دوباره تلاش کنید.";
      console.error("Server connection error:", errorMessage);
    }
  };

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
    getFaculties();
    getCourses();
  }, []);

  const timeSlots = generateTimeSlots();
  const daysOfWeek = [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنجشنبه",
  ];

  const lessonsByGroup = selectedGroup
    ? coursesData.filter((course) => course.faculty_fa === selectedGroup)
    : coursesData;

  const filteredCourses = lessonsByGroup.filter((course) =>
    selectedLesson !== "all" && selectedLesson.size
      ? selectedLesson.has(course.course_name_fa)
      : true
  );

  const handleCourseTimeToggle = (id: number) => {
    setSelectedClassTimes((prevSelectedClassTimes) => {
      const courseSelections = prevSelectedClassTimes[id] || new Set<number>();
      if (courseSelections.has(id)) {
        courseSelections.delete(id);
      } else {
        courseSelections.add(id);
      }
      return {
        ...prevSelectedClassTimes,
        [id]: new Set(courseSelections),
      };
    });
  };

  return {
    selectedGroup,
    setSelectedGroup,
    setSelectedLesson,
    selectedLesson,
    lessonsByGroup,
    filteredCourses,
    selectedClassTimes,
    handleCourseTimeToggle,
    daysOfWeek,
    timeSlots,
    coursesData,
    facultiesData,
  };
};

export default Logic;
