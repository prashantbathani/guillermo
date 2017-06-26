import { Component, OnInit } from '@angular/core';
import { TranslateService } from "ng2-translate";
import * as Global from "app/shared/global.setting";
import { HttpCommonService } from "app/shared/http.CommonService";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
year:string;
  constructor(private translate: TranslateService,private httpService: HttpCommonService,) { }

  ngOnInit() {
      this.year=new Date().getFullYear().toString();
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
}
