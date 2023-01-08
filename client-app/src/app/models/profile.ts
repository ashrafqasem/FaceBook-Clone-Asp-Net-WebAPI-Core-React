import { User } from "./user";

export interface Profile {
    userName: string;
    displayName: string;
    bio?: string;
    image?: string;
}

export class Profile implements Profile {
    constructor(user: User) {
        this.userName = user.displayName;
        this.displayName = user.displayName;
        this.image = user.image;
    }
}