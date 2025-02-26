export interface IUser {
    id: number;
    name?: string;
    username: string;
    phone?: string;
    email?: string;
    isPhoneVerified?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
