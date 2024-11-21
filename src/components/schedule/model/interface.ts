export interface CourseTime {
  course_day: number;
  course_start_time: string;
  course_end_time: string;
  place: string;
}

export interface ExamTime {
  date: string;
  exam_start_time: string;
  exam_end_time: string;
}

export interface Course {
  complete_course_number: string;
  name: string;
  group: string;
  total_unit: number;
  exam_times: ExamTime[];
  course_times: CourseTime[];
}
