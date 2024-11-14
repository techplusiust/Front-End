import React, { useState } from "react";
import DateObject from "react-date-object";
import {
  Card,
  Select,
  SelectItem,
  Selection,
  Checkbox,
} from "@nextui-org/react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface CourseTime {
  course_day: number;
  course_start_time: string;
  course_end_time: string;
  place: string;
}

interface ExamTime {
  date: string;
  exam_start_time: string;
  exam_end_time: string;
}

interface Course {
  complete_course_number: string;
  name: string;
  group: string;
  total_unit: number;
  exam_times: ExamTime[];
  course_times: CourseTime[];
}

const courses: Course[] = [
  {
    complete_course_number: "1411087_58",
    name: "الگوریتم",
    group: "پایه",
    total_unit: 3,
    exam_times: [
      {
        date: "1402-03-30",
        exam_start_time: "08:30:00",
        exam_end_time: "10:30:00",
      },
    ],
    course_times: [
      {
        course_day: 3,
        course_start_time: "16:30:00",
        course_end_time: "18:00:00",
        place: "A1",
      },
      {
        course_day: 1,
        course_start_time: "16:30:00",
        course_end_time: "18:00:00",
        place: "A2",
      },
    ],
  },
  {
    complete_course_number: "1411087_59",
    name: "هوش مصنوعی",
    group: "تخصصی",
    total_unit: 3,
    exam_times: [
      {
        date: "1402-04-15",
        exam_start_time: "10:00:00",
        exam_end_time: "12:00:00",
      },
    ],
    course_times: [
      {
        course_day: 2,
        course_start_time: "10:00:00",
        course_end_time: "11:30:00",
        place: "B1",
      },
      {
        course_day: 4,
        course_start_time: "08:00:00",
        course_end_time: "09:30:00",
        place: "B2",
      },
    ],
  },
  {
    complete_course_number: "1411087_60",
    name: "فیزیک",
    group: "پایه",
    total_unit: 4,
    exam_times: [
      {
        date: "1402-05-10",
        exam_start_time: "14:00:00",
        exam_end_time: "16:00:00",
      },
    ],
    course_times: [
      {
        course_day: 2,
        course_start_time: "11:30:00",
        course_end_time: "13:00:00",
        place: "C2",
      },
      {
        course_day: 3,
        course_start_time: "14:00:00",
        course_end_time: "15:30:00",
        place: "C2",
      },
    ],
  },
  {
    complete_course_number: "1411087_61",
    name: "مهندسی نرم‌افزار پیشرفته",
    group: "تخصصی",
    total_unit: 3,
    exam_times: [
      {
        date: "1402-06-20",
        exam_start_time: "13:00:00",
        exam_end_time: "15:00:00",
      },
    ],
    course_times: [
      {
        course_day: 2,
        course_start_time: "11:00:00",
        course_end_time: "12:30:00",
        place: "D1",
      },
      {
        course_day: 4,
        course_start_time: "16:00:00",
        course_end_time: "17:30:00",
        place: "D2",
      },
    ],
  },
  {
    complete_course_number: "1411087_62",
    name: "انقلاب اسلامی",
    group: "عمومی",
    total_unit: 2,
    exam_times: [
      {
        date: "1402-07-05",
        exam_start_time: "11:00:00",
        exam_end_time: "13:00:00",
      },
    ],
    course_times: [
      {
        course_day: 1,
        course_start_time: "08:00:00",
        course_end_time: "09:30:00",
        place: "E1",
      },
      {
        course_day: 5,
        course_start_time: "10:00:00",
        course_end_time: "11:30:00",
        place: "E2",
      },
    ],
  },
  {
    complete_course_number: "1411087_63",
    name: "مباحث ویژه",
    group: "اختیاری",
    total_unit: 3,
    exam_times: [
      {
        date: "1402-07-18",
        exam_start_time: "08:30:00",
        exam_end_time: "10:30:00",
      },
    ],
    course_times: [
      {
        course_day: 0,
        course_start_time: "12:00:00",
        course_end_time: "13:30:00",
        place: "F1",
      },
      {
        course_day: 2,
        course_start_time: "15:00:00",
        course_end_time: "16:30:00",
        place: "F2",
      },
    ],
  },
  {
    complete_course_number: "1411087_64",
    name: "روش تحقیق",
    group: "جبرانی",
    total_unit: 2,
    exam_times: [
      {
        date: "1402-08-02",
        exam_start_time: "09:00:00",
        exam_end_time: "11:00:00",
      },
    ],
    course_times: [
      {
        course_day: 4,
        course_start_time: "13:00:00",
        course_end_time: "14:30:00",
        place: "G1",
      },
      {
        course_day: 1,
        course_start_time: "11:00:00",
        course_end_time: "12:30:00",
        place: "G2",
      },
    ],
  },
];

const generateTimeSlots = (): string[] => {
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

const formatDate = (dateStr: string): string => {
  const date = new DateObject({
    date: dateStr,
    format: "YYYY-MM-DD HH:mm:ss",
    calendar: persian,
    locale: persian_fa,
  });
  return date.format("YYYY/MM/DD HH:mm");
};

const calculateRowSpan = (start: string, end: string): number => {
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

const Schedule: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [selectedLesson, setSelectedLesson] = useState<Selection>(new Set());
  const [selectedClassTimes, setSelectedClassTimes] = useState<{
    [key: string]: Set<number>;
  }>({});

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
    ? courses.filter((course) => course.group === selectedGroup)
    : courses;

  const filteredCourses = lessonsByGroup.filter((course) =>
    selectedLesson !== "all" && selectedLesson.size
      ? selectedLesson.has(course.name)
      : true
  );

  const handleCourseTimeToggle = (courseNumber: string, index: number) => {
    setSelectedClassTimes((prevSelectedClassTimes) => {
      const courseSelections =
        prevSelectedClassTimes[courseNumber] || new Set<number>();
      if (courseSelections.has(index)) {
        courseSelections.delete(index);
      } else {
        courseSelections.add(index);
      }
      return {
        ...prevSelectedClassTimes,
        [courseNumber]: new Set(courseSelections),
      };
    });
  };

  return (
    <div className="p-6 h-screen">
      <div className="flex gap-2 relative overflow-hidden h-full">
        <div className="flex-1 h-full flex flex-col">
          <h1 className="text-xl font-bold mb-4">زمان بندی کلاس‌ها</h1>
          <div className="flex gap-2">
            <Select
              variant="bordered"
              placeholder="انتخاب گروه آموزشی"
              multiple={false}
              selectedKeys={new Set([selectedGroup])}
              onSelectionChange={(keys) => {
                const group = Array.from(keys)[0] as string;
                setSelectedGroup(group);
                setSelectedLesson(new Set());
              }}
              className="mb-4 max-w-xs"
            >
              <SelectItem key="">همه گروه‌ها</SelectItem>
              <SelectItem key="پایه" value="پایه">
                پایه
              </SelectItem>
              <SelectItem key="تخصصی" value="تخصصی">
                تخصصی
              </SelectItem>
              <SelectItem key="عمومی" value="عمومی">
                عمومی
              </SelectItem>
              <SelectItem key="اختیاری" value="اختیاری">
                اختیاری
              </SelectItem>
              <SelectItem key="جبرانی" value="جبرانی">
                جبرانی
              </SelectItem>
            </Select>

            <Select
              multiple={false}
              variant="bordered"
              placeholder="انتخاب درس"
              selectedKeys={selectedLesson}
              onSelectionChange={setSelectedLesson}
              className="mb-4 max-w-xs"
            >
              {lessonsByGroup.map((item) => (
                <SelectItem key={item.name}>{item.name}</SelectItem>
              ))}
            </Select>
          </div>

          <div className="mb-4 text-sm">انتخاب کلاس:</div>
          <div className="overflow-y-auto flex-1">
            {filteredCourses.map((course) => (
              <Card
                key={course.complete_course_number}
                className="mb-6 p-4 shadow-lg border rounded-lg"
              >
                <div className="font-semibold mb-2 text-xs">
                  {course.name} (واحد: {course.total_unit}, تاریخ امتحان:{" "}
                  {course.exam_times
                    .map((item) =>
                      formatDate(`${item.date}T${item.exam_start_time}`)
                    )
                    .join(", ")}
                  )
                </div>

                {/* Checkbox Group for Classes */}
                {course.course_times.map((courseTime, index) => (
                  <Checkbox
                    size="sm"
                    key={index}
                    isSelected={
                      selectedClassTimes[course.complete_course_number]?.has(
                        index
                      ) || false
                    }
                    onChange={() =>
                      handleCourseTimeToggle(
                        course.complete_course_number,
                        index
                      )
                    }
                  >
                    <span className="mr-2 text-xs">
                      روز: {daysOfWeek[courseTime.course_day]}, زمان:{" "}
                      {courseTime.course_start_time} -{" "}
                      {courseTime.course_end_time} (مکان کلاس:{" "}
                      {courseTime.place})
                    </span>
                  </Checkbox>
                ))}
              </Card>
            ))}
          </div>
        </div>

        <div className="flex-[2] overflow-y-auto h-full">
          <div className="grid grid-cols-7">
            <div></div>
            {daysOfWeek.map((day, index) => (
              <div key={index} className="text-center font-bold sticky top-0">
                {day}
              </div>
            ))}
            {timeSlots.map((time, index) => (
              <React.Fragment key={index}>
                <div className="text-center font-semibold border-b-1">
                  {time}
                </div>
                {daysOfWeek.map((_, dayIndex) => (
                  <div key={dayIndex} className="relative border-b-1">
                    {filteredCourses.flatMap((course) => {
                      const selectedIndexes =
                        selectedClassTimes[course.complete_course_number];
                      if (!selectedIndexes) return null;

                      return Array.from(selectedIndexes).flatMap(
                        (selectedIndex) => {
                          const selectedCourseTime =
                            course.course_times[selectedIndex];
                          if (selectedCourseTime.course_day !== dayIndex)
                            return null;

                          const courseStart = new DateObject({
                            date: `1403/01/01 ${selectedCourseTime.course_start_time}`,
                            format: "YYYY/MM/DD HH:mm:ss",
                            calendar: persian,
                            locale: persian_fa,
                          });
                          const slotTime = new DateObject({
                            date: `1403/01/01 ${time}`,
                            format: "YYYY/MM/DD HH:mm",
                            calendar: persian,
                            locale: persian_fa,
                          });

                          if (
                            slotTime.toDate().getTime() ===
                            courseStart.toDate().getTime()
                          ) {
                            const rowSpan = calculateRowSpan(
                              selectedCourseTime.course_start_time,
                              selectedCourseTime.course_end_time
                            );

                            return (
                              <div
                                key={`${course.complete_course_number}-${selectedIndex}`}
                                className="text-center bg-gray-200 rounded-lg p-2 absolute inset-0 text-xs"
                                style={{ height: rowSpan * 24 - 0.15 }}
                              >
                                {course.name} ({selectedCourseTime.place})
                              </div>
                            );
                          }

                          return null;
                        }
                      );
                    })}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
