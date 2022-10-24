import { Teacher } from '../Teacher/index';
export interface Course {
    id: number;
    name: string;
    type: number;
    imageUrl: string;
    period: number;
    teacher: Teacher;
  }