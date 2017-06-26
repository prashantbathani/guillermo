import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpAdminService } from "app/admin/shared/http.AdminService";
import { toastyService } from "app/shared/toasty.service";
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import * as Global from "app/shared/global.setting";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html'
})
export class BookComponent implements OnInit {
  myBookFrom: FormGroup;
  myInItForm: FormGroup;
  book_Id: Number;
  viewPhoto: boolean;
  viewApprove: boolean;
  public domainURL: string = Global.domainURL + "Images/Book/";
  public photoUrl: string;
  public data;
  public rowsOnPage = 5;
  public sortBy = "boo_name";
  public sortOrder = "asc";
  public action: boolean;
  @ViewChild('myDeleteModal')
  modal: ModalComponent;
  formData = { "cou_id": 0, "location_id": 0, "boo_name": "", "boo_description": "", "boo_geolocalization": "", "book_photo": "", "boo_year": "", "boo_century": "", "boo_approve": "" };
  countries: any;
  locations: any;
  public address: Object;


  constructor(private fb: FormBuilder, private httpService: HttpAdminService, private toasty: toastyService) { }

  ngOnInit() {
    this.action = true;
    this.book_Id = 0;
    this.viewPhoto = false;
    if (atob(sessionStorage.getItem("RoleID")) == "1") {
      this.viewApprove = true;
    }
    this.myBookFrom = this.fb.group({
      cou_id: ['', Validators.required],
      location_id: ['', Validators.required],
      boo_name: ['', Validators.required],
      boo_description: ['', Validators.required],
      boo_geolocalization: ['', Validators.required],
      boo_year: ['', Validators.required],
      boo_century: ['', Validators.required]
    });
    this.BindCountry();
    this.BindLocation();
    this.BindBooks();
  }
  
  getAddress(place: Object) {
    this.address = place['formatted_address'];
    var location = place['geometry']['location'];
    debugger;
    var lat = location.lat();
    var lng = location.lng();
    this.address = lat.toString() + "/" + lng.toString();
  }

  BindCountry() {
    this.httpService.getCountry().subscribe((data) => {
      this.countries = JSON.parse(data);
    }, (err) => {
    });
  }
  BindLocation() {
    this.httpService.getLocation().subscribe((data) => {
      this.locations = JSON.parse(data);
    }, (err) => {
    });
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
  resetcontrol() {
    this.book_Id = 0;
    this.action = true;
    this.myInItForm = this.fb.group({
      cou_id: ['', Validators.required],
      location_id: ['', Validators.required],
      boo_name: ['', Validators.required],
      boo_description: ['', Validators.required],
      boo_geolocalization: ['', Validators.required],
      boo_year: ['', Validators.required],
      boo_century: ['', Validators.required]
    });
    this.myBookFrom = this.myInItForm;
    this.viewPhoto = false;
  }
  onBook() {
    this.toasty.removeToast();
    if (this.myBookFrom.dirty && this.myBookFrom.valid) {
      this.toasty.addToast("Wait", "Wait", "Please wait while we process your request.");
      var form = this.myBookFrom.value;
      form.boo_id = this.book_Id;
      form.user_id = atob(sessionStorage.getItem("userEID"));
      form.boo_geolocalization = this.address;
      form.book_photo = this.formData.book_photo;
      if (atob(sessionStorage.getItem("RoleID")) == "1") {
        form.boo_approve = 1;
      }
      else {
        form.boo_approve = 0;
      }
      this.httpService.AddBook(form).subscribe((data) => {
        var result = JSON.parse(data);
        this.toasty.removeToast();
        if (result > 0 && this.book_Id == 0) {
          //success
          this.toasty.addToast("Success", "Success", "Book added successfully.");
          this.resetcontrol();
          this.BindBooks();
          //this.BindData();
        }
        else if (result > 0 && this.book_Id > 0) {
          this.toasty.addToast("Success", "Success", "Book updated successfully.");
          this.resetcontrol();
          this.BindBooks();
          //this.BindData();
          this.action = true;
        }
        else if (result == 0) {
          this.toasty.addToast("Error", "Error", "Something happen wrong while processing your request.");
        }
        else {
          //already exists
          this.toasty.addToast("Warning", "Warning", "Book already exits .");
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
  onBooEdit(booid, cou_id, location_id, name, description, boo_geolocalization, book_photo, boo_year, boo_century) {
    debugger;
    this.book_Id = booid;
    this.myBookFrom = this.fb.group({
      boo_name: [name, Validators.required],
      boo_description: [description, Validators.required],
      cou_id: [cou_id, Validators.required],
      location_id: [location_id, Validators.required],
      boo_geolocalization: [boo_geolocalization, Validators.required],
      boo_year: [boo_year, Validators.required],
      boo_century: [boo_century, Validators.required]
    });
    this.photoUrl = this.domainURL + book_photo;
    this.viewPhoto = true;
    this.action = false;
  }
  onBooDelete(booid){
    this.book_Id =booid;
    this.modal.open();
  }
  onBookApprove(booid, obj) {
    this.toasty.addToast("Wait", "Wait", "Please wait while we process your request.");
    this.httpService.UpdateStatus(booid).subscribe((data) => {
      var result = JSON.parse(data);
      this.toasty.removeToast();
      this.toasty.removeToast();
      if (result > 0) {
        this.toasty.addToast("Success", "Success", "Book status updated successfully.");
        this.BindBooks();
      }
      else if (result == 0) {
        this.toasty.addToast("Error", "Error", "Something happen wrong while processing your request.");
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
  selectFile($event): void {
    this.readThis($event.target);

  }

  readThis(inputValue: any): void {
    debugger;
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.formData.book_photo = myReader.result;
    }
    myReader.readAsDataURL(file);
  }
  onDelete() {
    this.toasty.addToast("Wait", "Wait", "Please wait while we process your request.");
    this.httpService.DeleteBook(this.book_Id).subscribe((data) => {
      debugger;
      var result = data;
      this.toasty.removeToast();
      if (result > 0) {
        //success
        this.toasty.addToast("Success", "Success", "Location deleted successfully.");
        this.modal.close();
        this.BindBooks();
        this.book_Id = 0;
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
