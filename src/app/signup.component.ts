import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { HttpCommonService } from "app/shared/http.CommonService";
import { IMyDpOptions } from "mydatepicker";
import { ValidationService } from "app/shared/validationService";
import { toastyService } from "app/shared/toasty.service";
import { Router } from "@angular/router";
import { TranslateService } from "ng2-translate";
import * as Global from "app/shared/global.setting";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  mySignupForm: FormGroup;
  myInItForm: FormGroup;
  formData = { "use_email": "", "use_nick_name": "", "use_name": "", "use_last_name": "", "use_password": "", "cou_id": 0, "use_photo": "", "use_birthday": "", "use_role": "2" };
  countries: any;

  private myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
    height: '30px',
  };
   private model: Object = { date: { year: 1985, month: 1, day:1 } };
  constructor(private fb: FormBuilder, private http: Http, private httpService: HttpCommonService, private toasty: toastyService, private router: Router, private translate: TranslateService) {
  }

  ngOnInit() {

    this.mySignupForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      NickName: ['', Validators.required],
      Email: ['', [Validators.required, ValidationService.emailValidator]],
      Password: ['', Validators.required],
      ConfirmPassword: ['', [Validators.required, ValidationService.comparePasswordValidator]],
      Birthday: ['', Validators.required],
      Country: ['', Validators.required]
    });
    this.selectLang();
    this.bindData();
  }
  selectLang() {
    this.translate.addLangs(Global.Language);
    this.translate.use(this.httpService.GetLanguage());
  }
  onLanguageChange(objLanguage) {
    localStorage.setItem("Language", objLanguage.target.value);
    this.translate.use(objLanguage.target.value);
  } bindData() {
    this.httpService.getCountry().subscribe((data) => {
      this.countries = JSON.parse(data);
    }, (err) => {

    });
  }

  onSignup() {

    this.toasty.removeToast();

    if (this.mySignupForm.dirty && this.mySignupForm.valid) {
      var data = this.mySignupForm.value;
      this.formData.use_email = data.Email;
      this.formData.use_nick_name = data.NickName;
      this.formData.use_name = data.FirstName;
      this.formData.use_last_name = data.LastName;
      this.formData.use_password = data.Password;
      this.formData.cou_id = data.Country;
      debugger;
      this.formData.use_birthday = data.Birthday.formatted;
      this.toasty.addToast("Wait", "Wait", "Please wait while we process your request.");
      this.httpService.signUp(this.formData).subscribe((data) => {
        this.toasty.removeToast();
        var result = JSON.parse(data);
        debugger;
        if (result > 0) {
          //success
          // this.toasty.addToast("Success", "Success", "User register successfully.");
          // this.reset();
          sessionStorage.setItem("user", btoa(this.formData.use_email + ':' + encodeURIComponent(this.formData.use_password)));
          sessionStorage.setItem("userEID", btoa(result));
          sessionStorage.setItem("RoleID", btoa(this.formData.use_role));
          sessionStorage.setItem("displayName", this.formData.use_nick_name);
          if (this.formData.use_role == "1") {
            this.router.navigate(['admin'])
          }
          else {
            this.router.navigate(['user'])
          }
        }
        else {
          //already exists
          this.toasty.addToast("Warning", "Warning", "this email alredy taken");
        }
      }, (err) => {
        //error
        this.toasty.removeToast();
        this.toasty.addToast("Error", "Error", "Something happen wrong while processing your request.");
      });
    }

  }

  reset() {
    debugger;
    this.myInItForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      NickName: ['', Validators.required],
      Email: ['', [Validators.required, ValidationService.emailValidator]],
      Password: ['', Validators.required],
      ConfirmPassword: ['', [Validators.required, ValidationService.comparePasswordValidator]],
      Birthday: ['', Validators.required],
      Country: ['', Validators.required]
    });
    this.mySignupForm = this.myInItForm;
  }

  selectFile($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {

      this.formData.use_photo = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

}
