import { Teacher } from '../Teacher/index';
export interface Type{
  id: number | null | string;
  name: string;
}
export interface Course {
    coverUrl: string | null;
    id: number | null;
    introduction:string | null;
    name: string | null;
    period: number | null;
    type: Type;
    view:number | null;
    teacher: Teacher;
  }