export interface Auth {
    isAuth() : Promise<boolean>;
    getProfileRole() : Promise<string>;
}
