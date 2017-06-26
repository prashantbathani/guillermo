import { Component, OnInit } from '@angular/core';
import { toastyService } from "app/shared/toasty.service";
import { HttpAdminService } from "app/admin/shared/http.AdminService";

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html'
})
export class PermissionListComponent implements OnInit {
public PermissionList;
  constructor(private toasty: toastyService, private httpService: HttpAdminService) { }

  ngOnInit() {
     this.BindData();
  }
   BindData() {
    debugger;
    this.toasty.addToast("Wait", "Wait", "Please wait while we process your request.");
    this.httpService.GetPermission().subscribe((result) => {
      this.PermissionList = JSON.parse(result);
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
