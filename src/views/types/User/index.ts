import { Classes } from '../Classes';
export interface User{
    id: number | null;
    avatarUrl?: string | null;
    email?: string | null;
    gender?: number | null;
    nickName: string | null;
    openid?: string;
    password?: string;
    phone?: string | null;
    username?: string;
    grades?: Classes[];
}