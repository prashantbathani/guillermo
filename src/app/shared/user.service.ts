import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  private loggedIn = false;

  constructor() {
    debugger;
    if(!!sessionStorage.getItem('userEID') && sessionStorage.getItem('userEID') != null)
        this.loggedIn = !!sessionStorage.getItem('userEID');
    else
        this.loggedIn = false;
  }
  
  logout() {
    sessionStorage.removeItem('userEID');
    this.loggedIn = false;
  }

  isLoggedIn() {
    debugger;
    //return this.loggedIn;
    if(!!sessionStorage.getItem('userEID') && sessionStorage.getItem('userEID') != null)
        return true;
    else
        return false;
  }

  isAdmin() {
    debugger;
    if(atob(sessionStorage.getItem('RoleID')) == "1"){
      return true;
    }
    else{
      false;
    }
  }
}