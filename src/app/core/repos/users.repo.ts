import { User } from "../interfaces/user.interface";

export interface UsersRepo{
    createUser( user : User ) : Promise<any>;
    getUser( userId : string ) : Promise<User>;
    updateUser( userId : string, user : User ) : Promise<any>;
    deleteUser( userId : string ) : Promise<any>;
    getUsers( pageSize : number, startAt : number ) : Promise<Array<User>>;
}