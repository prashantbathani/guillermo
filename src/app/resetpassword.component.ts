import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpCommonService } from "app/shared/http.CommonService";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ValidationService } from "app/shared/validationService";
import { toastyService } from "app/shared/toasty.service";
import { TranslateService } from "ng2-translate";
import * as Global from "app/shared/global.setting";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html'
})
export class ResetpasswordComponent implements OnInit {
  token: any;
  inValid: boolean;
  valid: boolean;
  myResetPasswordFrom: FormGroup;
  myInItForm: FormGroup;
  formData = { "use_password": "", "use_confirmpassword": "" ,"use_token":"" };
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private httpService: HttpCommonService, private toasty: toastyService,private router: Router,private translate: TranslateService) {
    this.inValid = false;
    this.valid = false;
    this.token = activatedRoute.snapshot.params['id'];
  }
  ngOnInit() {
    // this.activatedRoute.params.subscribe((params: Params) => {
    //   debugger;
      
    // });
    this.checkToken();
    this.myResetPasswordFrom = this.fb.group({
      Password: ['', Validators.required],
      ConfirmPassword: ['', [Validators.required, ValidationService.comparePasswordValidator]],
      token: this.token
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
  onResetPassword() {
    debugger;
    this.toasty.removeToast();
    if (this.myResetPasswordFrom.dirty && this.myResetPasswordFrom.valid) {

      var data = this.myResetPasswordFrom.value;
      this.formData.use_password=data.Password;
      this.formData.use_token=data.token;

      this.toasty.addToast("Wait", "Wait", "Please wait while we process your request.");
      this.httpService.ResetPassword(this.formData).subscribe((data) => {
        this.toasty.removeToast();
        var result = JSON.parse(data);
        debugger;
        if (result > 0) {
          this.toasty.addToast("Success", "Success", "Password reset successfully.");
          this.reset();
          this.router.navigate(['login'])
        }
        else {
          this.toasty.addToast("Warning", "Warning", "Invaild token/password.");
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
       Password: ['', Validators.required],
       ConfirmPassword: ['', [Validators.required, ValidationService.comparePasswordValidator]]
    });
    this.myResetPasswordFrom = this.myInItForm;
  }
  checkToken() {
    this.httpService.ValidateToken(this.token).subscribe((data) => {
      debugger;
      if (data) {
        this.valid = true;
      }
      else {
        this.inValid = true;
      }
    });
  }
}
