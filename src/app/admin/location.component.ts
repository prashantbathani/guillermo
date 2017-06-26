import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { HttpAdminService } from "app/admin/shared/http.AdminService";
import { toastyService } from "app/shared/toasty.service";
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html'
})

export class LocationComponent implements OnInit {
  myLocationFrom: FormGroup;
  myInItForm: FormGroup;
  LocId: Number;
  public action: boolean;
  public data;
  public rowsOnPage = 5;
  public sortBy = "loc_father";
  public sortOrder = "desc";
  @ViewChild('myDeleteModal')
  modal: ModalComponent;
  locations: any;
  formData = { "loc_id_father": 0, "loc_description": "" };
  constructor(private fb: FormBuilder, private toasty: toastyService, private httpService: HttpAdminService) { }

  ngOnInit() {
    this.action = true;
    this.LocId = 0;
    this.myLocationFrom = this.fb.group({
      loc_id_father: [''],
      loc_description: ['', Validators.required]
    });
    this.BindLocationFather();
    this.BindData();
  }
  BindLocationFather() {
    this.httpService.getLocation().subscribe((data) => {
      this.locations = JSON.parse(data);
      debugger;
    }, (err) => {
    });
  }
  BindData() {
    this.toasty.addToast("Wait", "Wait", "Please wait while we process your request.");
    this.httpService.getLocation().subscribe((result) => {
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
  onLocation() {
    this.toasty.removeToast();
    if (this.myLocationFrom.dirty && this.myLocationFrom.valid) {
      this.toasty.addToast("Wait", "Wait", "Please wait while we process your request.");
      var form = this.myLocationFrom.value;
      form.loc_id = this.LocId;
      debugger;
      this.httpService.AddLocation(form).subscribe((data) => {
        var result = JSON.parse(data);
        this.toasty.removeToast();
        if (result > 0 && this.LocId == 0) {
          //success
          this.toasty.addToast("Success", "Success", "Location added successfully.");
          this.resetcontrol();
          this.BindLocationFather();
          this.BindData();
        }
        else if (result > 0 && this.LocId > 0) {
          this.toasty.addToast("Success", "Success", "Location updated successfully.");
          this.resetcontrol();
          this.BindLocationFather();
          this.BindData();
          this.action = true;
        }
        else if (result == 0) {
          this.toasty.addToast("Error", "Error", "Something happen wrong while processing your request.");
        }
        else {
          //already exists
          this.toasty.addToast("Warning", "Warning", "Location already exits .");
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
  resetcontrol() {
    this.LocId = 0;
    this.action = true;
    this.myInItForm = this.fb.group({
      loc_id_father: [''],
      loc_description: ['', Validators.required]
    });
    this.myLocationFrom = this.myInItForm;
  }
  onLocationEdit(locid, locfatherid, locname) {
    this.LocId = locid;
    debugger;
    this.myLocationFrom = this.fb.group({
    loc_id_father: [locfatherid],
    loc_description: [locname, Validators.required]
    });
    this.action = false;
  }
  onLocationDelete(loc_id) {
    this.LocId = loc_id;
    this.modal.open();
  }
   onDelete() {
    this.toasty.addToast("Wait", "Wait", "Please wait while we process your request.");
    this.httpService.DeleteLocation(this.LocId).subscribe((data) => {
      debugger;
      var result = data;
      this.toasty.removeToast();
      if (result > 0) {
        //success
        this.toasty.addToast("Success", "Success", "Location deleted successfully.");
        this.modal.close();
        this.BindData();
        this.LocId = 0;
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
}
