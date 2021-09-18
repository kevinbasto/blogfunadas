import { InjectionToken } from "@angular/core";
import { Auth } from "../../core/services/auth/auth";
import { Login } from "../../core/services/auth/login";

export const LoginServiceToken = new InjectionToken<Login>('LoginService');
export const AuthServicetoken = new InjectionToken<Auth>('RegisterService');