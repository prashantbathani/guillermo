import { Component, OnInit } from '@angular/core';
import { toastyService } from "app/shared/toasty.service";
import { HttpAdminService } from "app/admin/shared/http.AdminService";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  public data;
  public rowsOnPage = 5;
  public sortBy = "rol_name";
  public sortOrder = "asc";
  constructor(private toasty: toastyService, private httpService: HttpAdminService) { }

  ngOnInit() {
    this.BindData()
  }
  BindData() {
    this.toasty.addToast("Wait", "Wait", "Please wait while we process your request.");
    this.httpService.GetAllUser().subscribe((result) => {
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
