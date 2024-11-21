import React from "react";
import DateObject from "react-date-object";
import { Card, Select, SelectItem, Checkbox } from "@nextui-org/react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { formatDate } from "./utils/formatDate";
import { calculateRowSpan } from "./utils/calculateRowSpan";
import Logic from "./logic";

const Schedule: React.FC = () => {
  const {
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
  } = Logic();
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
