import { Routes, RouterModule } from "@angular/router"
import { AdminDashboardComponent } from "app/admin/admin-dashboard.component";
import { RoleComponent } from "app/admin/role.component";
import { PermissionComponent } from "app/admin/permission.component";
import { RolepermissionComponent } from "app/admin/rolepermission.component";
import { UsersComponent } from "app/admin/users.component";
import { BookComponent } from "app/admin/book.component";
import { LocationComponent } from "app/admin/location.component";
import { LoggedInGuard } from "app/shared/logged-in.guard";
import { AdminGuard } from "app/admin/shared/admin-guard";
import { UserListComponent } from "app/admin/usercomponent/user-list.component";
import { PermissionListComponent } from "app/admin/usercomponent/permission-list.component";

export const ADMIN_ROUTES: Routes = [
    { path: '', component: AdminDashboardComponent, canActivate: [LoggedInGuard,AdminGuard] },
    { path: 'dashboard', component: AdminDashboardComponent, canActivate: [LoggedInGuard,AdminGuard] },
    { path: 'role', component: RoleComponent,canActivate: [LoggedInGuard,AdminGuard], 
     children: [{ path: 'user-list', component: UserListComponent},{ path: 'user-list', component: PermissionListComponent}],},
    { path: 'permission', component: PermissionComponent, canActivate: [LoggedInGuard,AdminGuard] },
    { path: 'rolepermission', component: RolepermissionComponent, canActivate: [LoggedInGuard,AdminGuard] },
    { path: 'book', component: BookComponent, canActivate: [LoggedInGuard,AdminGuard] },
    { path: 'location', component: LocationComponent, canActivate: [LoggedInGuard,AdminGuard] },
    { path: 'users', component: UsersComponent, canActivate: [LoggedInGuard,AdminGuard] }
    
];