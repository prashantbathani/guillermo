import { Component, OnInit } from '@angular/core';
import { toastyService } from "app/shared/toasty.service";
import { HttpAdminService } from "app/admin/shared/http.AdminService";
import * as Global from "app/shared/global.setting";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {
 public data;
 public domainURL: string = Global.domainURL + "Images/Book/";
  constructor(private toasty: toastyService, private httpService: HttpAdminService) { }

  ngOnInit() {
    this.BindBooks()
  }
 BindBooks() {
    this.toasty.addToast("Wait", "Wait", "Please wait while we process your request.");
    this.httpService.GetAllBooks().subscribe((result) => {
      debugger;
      this.data = JSON.parse(result);
      this.toasty.removeToast();
    }, (err) => {
      if (err === 'Unauthorized') {
        this.toasty.addToast("Error", "Unauthorized", "You are not authorized to perform this operation");
      }
      else {
        this.toasty.removeToast();
        this.toasty.addToast("Error", "Error", "Something happen wrong while processing your request.");
      }
    });
  }
}
