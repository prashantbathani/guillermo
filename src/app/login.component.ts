import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpCommonService } from "app/shared/http.CommonService";
import { toastyService } from "app/shared/toasty.service";
import { ValidationService } from "app/shared/validationService";
import { Router } from "@angular/router";
import { TranslateService } from "ng2-translate";
import * as Global from "app/shared/global.setting";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  myLoginFrom: FormGroup;
  formData = { "use_email": "", "use_password": "" };
  constructor(private fb: FormBuilder, private httpService: HttpCommonService, private toasty: toastyService, private router: Router, private translate: TranslateService) {
  }

  ngOnInit() {
    this.myLoginFrom = this.fb.group({
      use_email: ['', [Validators.required, ValidationService.emailValidator]],
      use_password: ['', Validators.required]
    });
    this.selectLang();
    sessionStorage.clear();
  }
  selectLang() {
    this.translate.addLangs(Global.Language);
    this.translate.use(this.httpService.GetLanguage());
  }
  onLanguageChange(objLanguage) {
    localStorage.setItem("Language", objLanguage.target.value);
    this.translate.use(objLanguage.target.value);
  }
  onUserLogin() {
    this.toasty.removeToast();
    if (this.myLoginFrom.dirty && this.myLoginFrom.valid) {
      this.toasty.addToast("Wait", "Wait", "Please wait while we process your request.");
      var form = this.myLoginFrom.value;
      this.httpService.Login(this.myLoginFrom.value).subscribe((data) => {
        this.toasty.removeToast();
        var result = JSON.parse(data);
        debugger;
        if (result.IsLogin) {
          sessionStorage.setItem("user", btoa(form.use_email + ':' + encodeURIComponent(form.use_password)));
          sessionStorage.setItem("userEID", btoa(result.use_id));
          sessionStorage.setItem("RoleID", btoa(result.use_role));
          sessionStorage.setItem("displayName", result.use_nick_name);
          if (result.use_role == 1) {
            this.router.navigate(['admin'])
          }
          else {
            this.router.navigate(['user'])
          }
        }
        else {
          this.toasty.addToast("Warning", "Warning", "Invaild username/password.");
        }
      }, (err) => {
        this.toasty.removeToast();
        this.toasty.addToast("Error", "Error", "Something happen wrong while processing your request.");
      });
    }

  }
}
