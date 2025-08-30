import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { IRegisterUserResponse } from "../interfaces/IRegisterUserResponse";

@Injectable(
    {
        providedIn: "root"
    }
)
export class AuthService{
    private http = inject(HttpClient);
    
     baseURL : string ='https://ecommerce.routemisr.com/api/v1/auth';

    registerUser(userData:{}){
        return this.http.post<IRegisterUserResponse>(`${this.baseURL}/signup`, userData);
    }
    signIn(userData:{}){
        return this.http.post<IRegisterUserResponse>(`${this.baseURL}/signin`, userData);
    }
}