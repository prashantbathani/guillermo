import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import * as Global from "app/shared/global.setting";

@Injectable()
export class HttpAdminService {
    public domainURL: string = Global.domainURL + "api/";
    constructor(private http: Http) {
    }
      // Get Country Name
    getCountry() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.domainURL + "Country/getcountry", options).map((res: Response) => res.json());
    }
      // Get Location Name
    getLocation() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        headers.append('Authorization', 'Basic ' + sessionStorage.getItem("user"));
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.domainURL + "Location/getLocation", options).map((res: Response) => res.json()).catch(e => {
            debugger;
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
        });
    }
    //Role -- Add New Role
    AddRole(role) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        headers.append('Authorization', 'Basic ' + sessionStorage.getItem("user"));
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(role);
        return this.http.post(this.domainURL + 'Role/CreateRole', body, options).map((res: Response) => res.json()).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
        });
    }
    // Role -- Get All Role
    GetRole() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        headers.append('Authorization', 'Basic ' + sessionStorage.getItem("user"));
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.domainURL + "Role/GetRole", options).map((res: Response) => res.json()).catch(e => {
            debugger;
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
        });
    }
    //Role -- Delete Role
    DeleteRole(Role) {
        debugger;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        headers.append('Authorization', 'Basic ' + sessionStorage.getItem("user"));
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.domainURL + 'Role/DeleteRole/' + Role, options).map((res: Response) => res.json()).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
        });
    }
    // Permission -- Get All Permission
    GetPermission() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        headers.append('Authorization', 'Basic ' + sessionStorage.getItem("user"));
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.domainURL + "Permission/GetPermission", options).map((res: Response) => res.json()).catch(e => {
            debugger;
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
        });
    }
    //Permission -- Add New Permission
    AddPermission(permission) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        headers.append('Authorization', 'Basic ' + sessionStorage.getItem("user"));
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(permission);
        return this.http.post(this.domainURL + 'Permission/CreatePermission', body, options).map((res: Response) => res.json()).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
        });
    }
    //Permission -- Delete Permission
    DeletePermission(permission) {
        debugger;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        headers.append('Authorization', 'Basic ' + sessionStorage.getItem("user"));
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.domainURL + 'Permission/DeletePermission/' + permission, options).map((res: Response) => res.json()).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
        });
    }
    // RolePermission -- Get All RolePermission
    GetRolePermission() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        headers.append('Authorization', 'Basic ' + sessionStorage.getItem("user"));
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.domainURL + "RolePermission/GetRolePermission", options).map((res: Response) => res.json()).catch(e => {
            debugger;
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
        });
    }
    // RolePermission -- Add New RolePermission
    AddRolePermission(rolepermission) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        headers.append('Authorization', 'Basic ' + sessionStorage.getItem("user"));
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(rolepermission);
        return this.http.post(this.domainURL + 'RolePermission/CreateRolePermission', body, options).map((res: Response) => res.json()).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
        });
    }
    // RolePermission -- Delete RolePermission
    DeleteRolePermission(rolepermission) {
        debugger;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        headers.append('Authorization', 'Basic ' + sessionStorage.getItem("user"));
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.domainURL + 'RolePermission/DeleteRolePermission/' + rolepermission, options).map((res: Response) => res.json()).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
        });
    }
    // All User -- Get All User
    GetAllUser(){
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        headers.append('Authorization', 'Basic ' + sessionStorage.getItem("user"));
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.domainURL + "Account/GetAllUser", options).map((res: Response) => res.json()).catch(e => {
            debugger;
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
        });
    }
    // All Books -- Get All Books
    GetAllBooks(){
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        headers.append('Authorization', 'Basic ' + sessionStorage.getItem("user"));
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.domainURL.concat("Book/GetBooks/",String(atob(sessionStorage.getItem("RoleID"))), "|",String(atob(sessionStorage.getItem("userEID")))) , options).map((res: Response) => res.json()).catch(e => {
        //return this.http.get(this.domainURL.concat("Book/GetBooks") , options).map((res: Response) => res.json()).catch(e => {
            debugger;
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
        });
    }
    //Book -- Add New Book
    AddBook(permission) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        headers.append('Authorization', 'Basic ' + sessionStorage.getItem("user"));
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(permission);
        return this.http.post(this.domainURL + 'Book/CreateBook', body, options).map((res: Response) => res.json()).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
        });
    }
    // Location -- Add New Location
    AddLocation(location) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        headers.append('Authorization', 'Basic ' + sessionStorage.getItem("user"));
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(location);
        return this.http.post(this.domainURL + 'Location/CreateLocation', body, options).map((res: Response) => res.json()).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
        });
    }
    // Location -- Delete Location
    DeleteLocation(location) {
        debugger;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        headers.append('Authorization', 'Basic ' + sessionStorage.getItem("user"));
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.domainURL + 'Location/DeleteLocation/' + location, options).map((res: Response) => res.json()).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
        });
    }
     UpdateStatus(Booid) {
        debugger;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        headers.append('Authorization', 'Basic ' + sessionStorage.getItem("user"));
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.domainURL + 'Book/UpdateBookStatus/' + Booid, options).map((res: Response) => res.json()).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
        });
    }
     //Book -- Delete Book
    DeleteBook(Role) {
        debugger;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        headers.append('Authorization', 'Basic ' + sessionStorage.getItem("user"));
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.domainURL + 'Book/DeleteBook/' + Role, options).map((res: Response) => res.json()).catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
        });
    }
}