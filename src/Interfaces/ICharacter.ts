export interface ICharacter {
    id: number;
    name: string;
    character_image: string;
    description: string;
    character_bio: string;
    isPremiumCharacter: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
