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

export interface ICourse {
  id: number;
  course_name_fa: string;
  course_name_en: string;
  professor_id: number;
  professor_name: ProfessorName;
  faculty_fa: string;
  faculty_en: string;
  first_day_of_week: number;
  first_day_time: string;
  first_day_duration: number;
  second_day_of_week: number;
  second_day_time: string;
  second_day_duration: number;
  exam_date: string;
  exam_start_time: string;
  exam_duration: number;
}

export interface ProfessorName {
  en: string;
  fa: string;
}

export interface IFaculties {
  department_en: string;
  department_fa: string;
}
