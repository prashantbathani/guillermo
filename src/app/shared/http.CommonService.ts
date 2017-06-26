import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import * as Global from "app/shared/global.setting";

@Injectable()
export class HttpCommonService {
    public domainURL: string = Global.domainURL + "api/";
    constructor(private http: Http) {
    }
    //
    GetLanguage() {
        if (localStorage.getItem("Language") != null)
            return localStorage.getItem("Language");
        else
            return 'English';
    }
    // Get Country Name
    getCountry() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.domainURL + "country/getcountry", options).map((res: Response) => res.json());
    }
    // Account -- Register
    signUp(user) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });
        let body = user;
        return this.http.post(this.domainURL + 'Account/CreateUsers', body, options).map((res: Response) => res.json());
    }
    // Account - forgot password
    ForgotPassword(email) {
        debugger;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(email.Email);
        return this.http.post(this.domainURL + 'Account/ForgotPassword', body, options).map((res: Response) => res.json());
    }
    // Account -- Login
    Login(user) {
        debugger;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(user);
        return this.http.post(this.domainURL + 'Account/Login', body, options).map((res: Response) => res.json());
    }
    // Account -- Valid token
    ValidateToken(token) {
        debugger;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(token);
        return this.http.post(this.domainURL + 'Account/ValidateToken', body, options).map((res: Response) => res.json());
    }
    //Account -- Reset password
    ResetPassword(user) {
        debugger;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(user);
        return this.http.post(this.domainURL + 'Account/ResetPassword', body, options).map((res: Response) => res.json());
    }

}