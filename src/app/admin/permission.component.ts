import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import { toastyService } from "app/shared/toasty.service";
import { HttpAdminService } from "app/admin/shared/http.AdminService";

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html'
})
export class PermissionComponent implements OnInit {
  myPermissionFrom: FormGroup;
  myInItForm: FormGroup;
  perId: Number;
  public action: boolean;
  public data;
  public rowsOnPage = 5;
  public sortBy = "per_name";
  public sortOrder = "asc";
  @ViewChild('myDeleteModal')
  modal: ModalComponent;
  formData = { "per_name": "", "per_description": "", "per_rest_url": "" };
  constructor(private fb: FormBuilder, private toasty: toastyService, private httpService: HttpAdminService) { }

  ngOnInit() {
    this.action = true;
    this.perId = 0;
    this.myPermissionFrom = this.fb.group({
      per_name: ['', Validators.required],
      per_description: ['', Validators.required],
      per_rest_url: ['', Validators.required]
    });
    this.BindData();
  }
  BindData() {
    this.toasty.addToast("Wait", "Wait", "Please wait while we process your request.");
    this.httpService.GetPermission().subscribe((result) => {
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
  onUserPermission() {
    this.toasty.removeToast();
    if (this.myPermissionFrom.dirty && this.myPermissionFrom.valid) {
      this.toasty.addToast("Wait", "Wait", "Please wait while we process your request.");
      var form = this.myPermissionFrom.value;
      form.per_id = this.perId;
      this.httpService.AddPermission(form).subscribe((data) => {
        var result = JSON.parse(data);
        this.toasty.removeToast();
        if (result > 0 && this.perId == 0) {
          //success
          this.toasty.addToast("Success", "Success", "User permission added successfully.");
          this.myPermissionFrom.reset();
          this.BindData();
        }
        else if (result > 0 && this.perId > 0) {
          this.toasty.addToast("Success", "Success", "User permission updated successfully.");
          this.myPermissionFrom.reset();
          this.BindData();
          this.action = true;
        }
        else if (result == 0) {
          this.toasty.addToast("Error", "Error", "Something happen wrong while processing your request.");
        }
        else {
          //already exists
          this.toasty.addToast("Warning", "Warning", "permission already exits .");
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
    this.httpService.DeletePermission(this.perId).subscribe((data) => {
      debugger;
      var result = data;
      this.toasty.removeToast();
      if (result > 0) {
        //success
        this.toasty.addToast("Success", "Success", "User permission deleted successfully.");
        this.modal.close();
        this.BindData();
        this.perId = 0;
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
  onPermissionDelete(per_id) {
    debugger;
    this.perId = per_id;
    this.modal.open();
  }
  onPermissionEdit(per_id, name, description, url) {
    this.perId = per_id;
    this.myPermissionFrom = this.fb.group({
      per_name: [name, Validators.required],
      per_description: [description, Validators.required],
      per_rest_url: [url, Validators.required]
    });
    this.action = false;
  }
  resetcontrol() {
    this.perId = 0;
    this.action = true;
    this.myInItForm = this.fb.group({
      per_name: ['', Validators.required],
      per_description: ['', Validators.required],
      per_rest_url: ['', Validators.required]
    });
    this.myPermissionFrom = this.myInItForm;
  }

}
