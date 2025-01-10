import React from "react";
import DateObject from "react-date-object";
import { Card, Select, SelectItem, Checkbox } from "@nextui-org/react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { formatDate } from "./utils/formatDate";
import Logic from "./logic";
import { calculateRowSpan } from "./utils/calculateRowSpan";

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
    coursesData,
    facultiesData,
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
              <>
                {facultiesData.map((item) => (
                  <SelectItem
                    key={item.department_fa}
                    value={item.department_fa}
                  >
                    {item.department_fa}
                  </SelectItem>
                ))}
              </>
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
                <SelectItem key={item.course_name_fa}>
                  {item.course_name_fa}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="mb-4 text-sm">انتخاب کلاس:</div>
          <div className="overflow-y-auto flex-1">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="mb-6 p-4 shadow-lg border rounded-lg"
              >
                <div className="font-semibold mb-2 text-xs">
                  {course.course_name_fa} , تاریخ امتحان:{" "}
                  {formatDate(`${course.exam_date}T${course.exam_start_time}`)}
                </div>

                <Checkbox
                  size="sm"
                  key={`Checkbox_${course.id}`}
                  isSelected={
                    selectedClassTimes[course.id]?.has(course.id) || false
                  }
                  onChange={() => handleCourseTimeToggle(course.id)}
                >
                  <span className="mr-2 text-xs">
                    روز: {daysOfWeek[course.first_day_of_week]}, زمان:{" "}
                    {course.first_day_time} - مدت: {course.first_day_duration}{" "}
                    ساعت
                  </span>
                </Checkbox>
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
                      const selectedIndexes = selectedClassTimes[course.id];
                      if (!selectedIndexes) return null;

                      return Array.from(selectedIndexes).flatMap(
                        (selectedIndex) => {
                          const selectedCourseTime = coursesData.find(
                            (item) => item.id === selectedIndex
                          );
                          if (
                            selectedCourseTime &&
                            selectedCourseTime.first_day_of_week !== dayIndex
                          )
                            return null;

                          const courseStart = new DateObject({
                            date: `1403/01/01 ${selectedCourseTime?.first_day_time}`,
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
                              selectedCourseTime?.first_day_time ?? "",
                              selectedCourseTime?.first_day_duration ?? 0
                            );

                            return (
                              <div
                                key={`${course.id}-${selectedIndex}`}
                                className="text-center bg-gray-200 rounded-lg p-2 absolute inset-0 text-xs"
                                style={{ height: rowSpan * 24 - 0.15 }}
                              >
                                {course.course_name_fa}
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
