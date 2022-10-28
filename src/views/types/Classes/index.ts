import { User } from '../User/index';
export interface Classes {
    id: number;
    name: string | null;
    atmosphere: string | null;
    coverUrl: string | null;
    headteacher: User;
}
