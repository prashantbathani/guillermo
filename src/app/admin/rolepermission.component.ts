import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpAdminService } from "app/admin/shared/http.AdminService";
import { toastyService } from "app/shared/toasty.service";
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";

@Component({
  selector: 'app-rolepermission',
  templateUrl: './rolepermission.component.html'
})
export class RolepermissionComponent implements OnInit {
  myRolePermissionFrom: FormGroup;
  myInItForm: FormGroup;
  role_per_Id: Number;
  public action: boolean;
  public data;
  public rowsOnPage = 5;
  public sortBy = "rol_name";
  public sortOrder = "asc";
  @ViewChild('myDeleteModal')
  modal: ModalComponent;
  formData = { "rol_id": 0, "per_id": 0 };
  roles: any;
  permissions: any;
  constructor(private fb: FormBuilder, private toasty: toastyService, private httpService: HttpAdminService) { }

  ngOnInit() {
    this.action = true;
    this.role_per_Id = 0;
    this.myRolePermissionFrom = this.fb.group({
      rol_id: ['', Validators.required],
      per_id: ['', Validators.required]
    });
    this.BindRole();
    this.BindPermission();
    this.BindData();
  }
  BindData() {
    this.toasty.addToast("Wait", "Wait", "Please wait while we process your request.");
    this.httpService.GetRolePermission().subscribe((result) => {
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
  BindRole() {
    this.httpService.GetRole().subscribe((data) => {
      this.roles = JSON.parse(data);
    }, (err) => {
    });
  }
  BindPermission() {
    this.httpService.GetPermission().subscribe((data) => {
      this.permissions = JSON.parse(data);
    }, (err) => {
    });
  }
  onRolePermission() {
    this.toasty.removeToast();
    if (this.myRolePermissionFrom.dirty && this.myRolePermissionFrom.valid) {
      this.toasty.addToast("Wait", "Wait", "Please wait while we process your request.");
      var form = this.myRolePermissionFrom.value;
      form.per_rol_id = this.role_per_Id;
      debugger;
      this.httpService.AddRolePermission(form).subscribe((data) => {
        var result = JSON.parse(data);
        this.toasty.removeToast();
        if (result > 0 && this.role_per_Id == 0) {
          //success
          this.toasty.addToast("Success", "Success", "User role permission added successfully.");
          this.resetcontrol();
          this.BindData();
        }
        else if (result > 0 && this.role_per_Id > 0) {
          this.toasty.addToast("Success", "Success", "User role permission updated successfully.");
          this.resetcontrol();
          this.BindData();
          this.action = true;
        }
        else if (result == 0) {
          this.toasty.addToast("Error", "Error", "Something happen wrong while processing your request.");
        }
        else {
          //already exists
          this.toasty.addToast("Warning", "Warning", "Role permission already exits .");
        }
      }, (err) => {
        if (err === 'Unauthorized') {
          this.toasty.removeToast();
          this.toasty.addToast("Error", "Unauthorized", "You are not authorized to perform this operation");
        }
        else {
          this.toasty.addToast("Error", "Error", "Something happen wrong while processing your request.");
        }
      });
    }
  }
  onRolePermissionEdit(per_rol_id,rol_id,per_id) {
    debugger;
     this.role_per_Id = per_rol_id;
    this.myRolePermissionFrom = this.fb.group({
      rol_id: [rol_id, Validators.required],
      per_id: [per_id, Validators.required]
    });
    this.action = false;
  }
  onDelete() {
    this.toasty.addToast("Wait", "Wait", "Please wait while we process your request.");
    this.httpService.DeleteRolePermission(this.role_per_Id).subscribe((data) => {
      debugger;
      var result = data;
      this.toasty.removeToast();
      if (result > 0) {
        //success
        this.toasty.addToast("Success", "Success", "User role permission deleted successfully.");
        this.modal.close();
        this.BindData();
        this.role_per_Id = 0;
      }
      else
        this.toasty.addToast("Error", "Error", "Something happen wrong while processing your request.");
    }, (err) => {
      if (err === 'Unauthorized') {
        this.toasty.removeToast();
        this.toasty.addToast("Error", "Unauthorized", "You are not authorized to perform this operation");
      }
      else {
        this.toasty.addToast("Error", "Error", "Something happen wrong while processing your request.");
      }
    });
  }
  onRolePermissionDelete(per_rol_id) {
  this.role_per_Id = per_rol_id;
    this.modal.open();
  }
  resetcontrol() {
    this.role_per_Id = 0;
    this.action = true;
    this.myInItForm = this.fb.group({
      rol_id: ['', Validators.required],
      per_id: ['', Validators.required]
    });
    this.myRolePermissionFrom = this.myInItForm;
  }
}
