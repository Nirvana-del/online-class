import { Course } from '../Course';

export interface addOrEditChapter {
  id: number;
  course: number;
  name: string;
  state: number;
  videoUrl: string;
}

export interface Chapter {
  id: number;
  name: string;
  videoUrl: string;
  state: number;
  course: Course;
}

export interface RouteParams {
  courseId: number;
}