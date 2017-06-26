import { Component, OnInit, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { toastyService } from "app/shared/toasty.service";
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import { HttpAdminService } from "app/admin/shared/http.AdminService";
import { Router } from "@angular/router";
import { UserListComponent } from "app/admin/usercomponent/user-list.component";
import { PermissionListComponent } from "app/admin/usercomponent/permission-list.component";


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html'
})
export class RoleComponent implements OnInit {
  myRoleFrom: FormGroup;
  myInItForm: FormGroup;
  roleId: Number;
  public action: boolean;
  public data;
  public rowsOnPage = 5;
  public sortBy = "rol_name";
  public sortOrder = "asc";
  @ViewChild('myDeleteModal')
  @ViewChild('userlist', { read: ViewContainerRef })
  @ViewChild('pemissionlist', { read: ViewContainerRef })
  parent: ViewContainerRef;
  modal: ModalComponent;
  formData = { "rol_name": "", "rol_description": "" };
  constructor(private fb: FormBuilder, private toasty: toastyService, private httpService: HttpAdminService, private componentFactoryResolver: ComponentFactoryResolver) {
  }
  ngOnInit() {
    this.action = true;
    this.roleId = 0;
    this.myRoleFrom = this.fb.group({
      rol_name: ['', Validators.required],
      rol_description: ['', Validators.required]
    });
    this.BindData();
    this.BindUser();
    this.BindPermission();
  }
  // doSomething($event) {
  //   debugger;
  //   console.log('userlist:', $event);
  //}
    public doSomething(userId: any):void {
    debugger;
      console.log('Userlist : ', userId);
    }

  BindUser() {
    const userlist = this.componentFactoryResolver.resolveComponentFactory(UserListComponent);
    this.parent.createComponent(userlist);
  }
  BindPermission() {
    const pemissionlist = this.componentFactoryResolver.resolveComponentFactory(PermissionListComponent);
    this.parent.createComponent(pemissionlist);
  }
  BindData() {
    this.toasty.addToast("Wait", "Wait", "Please wait while we process your request.");
    this.httpService.GetRole().subscribe((result) => {
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
  onUserRole() {
    this.toasty.removeToast();
    if (this.myRoleFrom.dirty && this.myRoleFrom.valid) {
      this.toasty.addToast("Wait", "Wait", "Please wait while we process your request.");
      var form = this.myRoleFrom.value;
      form.rol_id = this.roleId;
      this.httpService.AddRole(form).subscribe((data) => {
        var result = JSON.parse(data);
        this.toasty.removeToast();
        if (result > 0 && this.roleId == 0) {
          //success
          this.toasty.addToast("Success", "Success", "User role added successfully.");
          this.myRoleFrom.reset();
          this.BindData();
        }
        else if (result > 0 && this.roleId > 0) {
          this.toasty.addToast("Success", "Success", "User role updated successfully.");
          this.myRoleFrom.reset();
          this.BindData();
          this.action = true;
        }
        else if (result == 0) {
          this.toasty.addToast("Error", "Error", "Something happen wrong while processing your request.");
        }
        else {
          //already exists
          this.toasty.addToast("Warning", "Warning", "Role already exits .");
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
  onDelete() {
    this.toasty.addToast("Wait", "Wait", "Please wait while we process your request.");
    this.httpService.DeleteRole(this.roleId).subscribe((data) => {
      debugger;
      var result = data;
      this.toasty.removeToast();
      if (result > 0) {
        //success
        this.toasty.addToast("Success", "Success", "User role deleted successfully.");
        this.modal.close();
        this.BindData();
        this.roleId = 0;
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
  onRoleDelete(roleid) {
    debugger;
    this.roleId = roleid;
    this.modal.open();
  }
  onRoleEdit(roleid, name, description) {
    this.roleId = roleid;
    this.myRoleFrom = this.fb.group({
      rol_name: [name, Validators.required],
      rol_description: [description, Validators.required]
    });
    this.action = false;
  }
  resetcontrol() {
    this.roleId = 0;
    this.action = true;
    this.myInItForm = this.fb.group({
      rol_name: ['', Validators.required],
      rol_description: ['', Validators.required]
    });
    this.myRoleFrom = this.myInItForm;
  }

}
