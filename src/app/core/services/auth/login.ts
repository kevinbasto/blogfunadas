import { LoginDto } from "../../interfaces/auth/login.interface";

export interface Login {
    emailLogin( login : LoginDto ) : Promise<any>;
}
