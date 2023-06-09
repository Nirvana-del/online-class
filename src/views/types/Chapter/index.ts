import { Course } from '../Course';

export interface Chapter {
  id: number;
  name: string | null;
  videoUrl: string | null;
  state: number | null;
  info:string | null;
  course: Course;
}

export interface RouteParams {
  courseId: number;
}