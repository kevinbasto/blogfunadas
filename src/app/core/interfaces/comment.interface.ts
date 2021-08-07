import { User } from "./user.interface";

export interface Comment{
    author : User;
    content : string;
}