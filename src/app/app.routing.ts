import { Routes, RouterModule } from "@angular/router"

import { HomeComponent } from "app/home.component";
import { LoginComponent } from "app/login.component";
import { AdminLayoutComponent } from "app/admin/admin-layout.component";
import { ADMIN_ROUTES } from "app/admin/admin.routing";
import { SignupComponent } from "app/signup.component";
import { ForgotComponent } from "app/forgot.component";
import { ResetpasswordComponent } from "app/resetpassword.component";
import { UserLayoutComponent } from "app/user/user-layout.component";
import { USER_ROUTES } from "app/user/user.routing";
import { LoggedInGuard } from "app/shared/logged-in.guard";
import { AdminGuard } from "app/admin/shared/admin-guard";

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forgot', component: ForgotComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'resetpassword/:id', component: ResetpasswordComponent },
    { path: 'admin', component: AdminLayoutComponent, children: ADMIN_ROUTES , canActivate: [LoggedInGuard,AdminGuard] },
    { path: 'user', component: UserLayoutComponent, children: USER_ROUTES, canActivate: [LoggedInGuard] },
    { path: '**', component: HomeComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);