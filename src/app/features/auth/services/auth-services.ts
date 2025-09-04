import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { IRegisterUserResponse } from "../interfaces/IRegisterUserResponse";
import { baseHttp } from "../../../core/services/base";
import { APP_APIS } from "../../../core/constant/appAPIs";
import { Router } from "@angular/router";

@Injectable(
    {
        providedIn: "root"
    }
)
export class AuthService extends baseHttp{
    private readonly router = inject(Router)
    registerUser(userData:{}){
        return this.http.post<IRegisterUserResponse>(APP_APIS.registerApi, userData);
    }
    signIn(userData:{}){
        return this.http.post<IRegisterUserResponse>(APP_APIS.loginApi, userData);
    }
    singOut(){
        
        localStorage.clear();
        this.router.navigateByUrl('/signin');
    }
}