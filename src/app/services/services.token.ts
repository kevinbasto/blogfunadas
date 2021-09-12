import { InjectionToken } from "@angular/core";
import { Login } from "../core/services/auth/login";

export const LoginServiceToken = new InjectionToken<Login>('LoginService');