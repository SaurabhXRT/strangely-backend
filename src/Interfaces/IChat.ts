import { ICharacter } from "./ICharacter";
export interface IChat {
    toJSON(): any;
    id: number;
    user_id: number;
    character_id: number;
    user_message: string;
    character_response: string;
    createdAt?: Date;
    updatedAt?: Date;
}
