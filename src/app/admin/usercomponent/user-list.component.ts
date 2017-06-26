import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { toastyService } from "app/shared/toasty.service";
import { HttpAdminService } from "app/admin/shared/http.AdminService";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  public UserList;
  UserId : any[];
  @Input() childData: any;
  @Output() onSelection = new EventEmitter<Selection[]>();
  constructor(private toasty: toastyService, private httpService: HttpAdminService) {
  }
  ngOnInit() {
    this.BindData();
    this.UserId = [];
  }
  onUserCheckChange($event) {
    if ($event.target.checked) {
      debugger;
      this.UserId.push($event.target.value);
      this.onSelection.emit(this.UserId);
    }
  }
  BindData() {
    debugger;
    this.toasty.addToast("Wait", "Wait", "Please wait while we process your request.");
    this.httpService.GetAllUser().subscribe((result) => {
      this.UserList = JSON.parse(result);
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
