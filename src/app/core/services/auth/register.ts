import { RegisterDto } from "../../interfaces/auth/register.interface";

export interface Register {
    emailRegister(register : RegisterDto) : Promise<any>;
}
