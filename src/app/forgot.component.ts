import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpCommonService } from "app/shared/http.CommonService";
import { ValidationService } from "app/shared/validationService";
import { toastyService } from "app/shared/toasty.service";
import { TranslateService } from "ng2-translate";
import * as Global from "app/shared/global.setting";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html'
})
export class ForgotComponent implements OnInit {
  myForgotPasswordFrom: FormGroup;
  myInItForm: FormGroup;
  constructor(private fb: FormBuilder, private httpService: HttpCommonService, private toasty: toastyService,private translate: TranslateService) { }

  ngOnInit() {
    this.myForgotPasswordFrom = this.fb.group({
      Email: ['', [Validators.required, ValidationService.emailValidator]]
    });
     this.selectLang();
  }
   
  selectLang() {
    this.translate.addLangs(Global.Language);
    this.translate.use(this.httpService.GetLanguage());
  }
  onLanguageChange(objLanguage) {
    localStorage.setItem("Language", objLanguage.target.value);
    this.translate.use(objLanguage.target.value);
  }  
  onForgotPassword() {
    this.toasty.removeToast();
    if (this.myForgotPasswordFrom.dirty && this.myForgotPasswordFrom.valid) {
      this.toasty.addToast("Wait", "Wait", "Please wait while we process your request.");
      var Email = this.myForgotPasswordFrom.value;
      this.httpService.ForgotPassword(Email).subscribe((data) => {
       
        this.toasty.removeToast();
        var result = JSON.parse(data);
        if (result == 1) {
          this.toasty.addToast("Success", "Success", "Please check your email for reset password.");
          this.reset();
        }
        else {
          this.toasty.addToast("Warning", "Warning", "Invaild email id.");
        }
      }, (err) => {
        this.toasty.removeToast();
        this.toasty.addToast("Error", "Error", "Something happen wrong while processing your request.");
      });
    }
  }
  reset(){
    debugger;
    this.myInItForm = this.fb.group({
      Email: ['', [Validators.required, ValidationService.emailValidator]]
    });
    this.myForgotPasswordFrom = this.myInItForm;
  }
}
