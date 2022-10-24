export interface addChapter {
    id: number,
    course: number;
    name: string;
    state: number;
}
export interface Chapter {
    id: number;
    name: string;
    courseName: string;
    courseId: number;
    info: string;
    video: string;
    status: number;
    statusInfo: string;
  }

export interface RouteParams {
    courseId: number;
  }