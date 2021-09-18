import { InjectionToken } from "@angular/core";
import { Auth } from "../../core/services/auth/auth";
import { Login } from "../../core/services/auth/login";
import { Register } from "../../core/services/auth/register";

export const LoginServiceToken = new InjectionToken<Login>('LoginService');
export const AuthServicetoken = new InjectionToken<Auth>('AuthService');
export const RegisterServiceToken = new InjectionToken<Register>('RegisterService')