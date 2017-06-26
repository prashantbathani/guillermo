import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MyDatePickerModule } from 'mydatepicker';
import {ToastyModule} from 'ng2-toasty';
import {DataTableModule} from "angular2-datatable";
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';
import { routing } from "app/app.routing";
import { AdminLayoutComponent } from './admin/admin-layout.component';
import { AdminDashboardComponent } from './admin/admin-dashboard.component';
import { SignupComponent } from './signup.component';
import { HttpCommonService } from "app/shared/http.CommonService";
import { ForgotComponent } from './forgot.component';
import { toastyService } from "app/shared/toasty.service";
import { ValidationService } from "app/shared/validationService";
import { ControlMessagesComponent } from "app/shared/control-messages.component";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { ResetpasswordComponent } from './resetpassword.component';
import { UserLayoutComponent } from './user/user-layout.component';
import { UserDashboardComponent } from './user/user-dashboard.component';
import { RoleComponent } from './admin/role.component';
import { PermissionComponent } from './admin/permission.component';
import { DataFilterRolePipe } from "app/admin/datatablefilter/data-filter-role.pipe";
import { DataFilterPermissionPipe } from "app/admin/datatablefilter/data-filter-permission.pipe";
import { HttpAdminService } from "app/admin/shared/http.AdminService";
import { RolepermissionComponent } from './admin/rolepermission.component';
import { DataFilterRolePermissionPipe } from "app/admin/datatablefilter/data-filter-rolepermission.pipe";
import { UsersComponent } from './admin/users.component';
import { DataFilterUserPipe } from "app/admin/datatablefilter/data-filter-user.pipe";
import { BookComponent } from './admin/book.component';
import { GoogleplaceDirective } from "app/directives/googleplace.directive";
import { LocationComponent } from './admin/location.component';
import { DataFilterLocationPipe } from "app/admin/datatablefilter/data-filter-location.pipe";
import { DataFilterBookPipe } from "app/admin/datatablefilter/data-filter-book.pipe";
import { LoggedInGuard } from "app/shared/logged-in.guard";
import { UserService } from "app/shared/user.service";
import { AdminGuard } from "app/admin/shared/admin-guard";
import {TranslateModule} from "ng2-translate";
import { UserListComponent } from "app/admin/usercomponent/user-list.component";
import { PermissionListComponent } from "app/admin/usercomponent/permission-list.component";



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AdminLayoutComponent,
    AdminDashboardComponent,
    SignupComponent,
    ForgotComponent,
    ControlMessagesComponent,
    ResetpasswordComponent,
    UserLayoutComponent,
    UserDashboardComponent,
    RoleComponent,
    PermissionComponent,
    DataFilterRolePipe,
    DataFilterPermissionPipe,
    RolepermissionComponent,
    DataFilterRolePermissionPipe,
    UsersComponent,
    DataFilterUserPipe,
    BookComponent,
    GoogleplaceDirective,
    LocationComponent,
    DataFilterLocationPipe,
    DataFilterBookPipe,
    UserListComponent,
    PermissionListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MyDatePickerModule,
    ReactiveFormsModule,
    ToastyModule.forRoot(),
    DataTableModule,
    Ng2Bs3ModalModule,
    TranslateModule.forRoot()
  ],
  providers: [HttpCommonService,HttpAdminService,toastyService,ValidationService,LoggedInGuard,UserService,AdminGuard,{provide: LocationStrategy, useClass: HashLocationStrategy} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
