import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TranslateService } from "ng2-translate";
import * as Global from "app/shared/global.setting";
import { HttpCommonService } from "app/shared/http.CommonService";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent implements OnInit {

  constructor(private router: Router,private httpService: HttpCommonService,private translate: TranslateService) { }
  
  ngOnInit() {
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
  onLogOut() {
    sessionStorage.clear();
    this.router.navigate(['home'])
  }
}
