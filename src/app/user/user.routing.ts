import { Routes, RouterModule } from "@angular/router"
import { UserDashboardComponent } from "app/user/user-dashboard.component";
import { BookComponent } from "app/admin/book.component";
import { LoggedInGuard } from "app/shared/logged-in.guard";

export const USER_ROUTES: Routes = [
    { path: '', component: UserDashboardComponent, canActivate: [LoggedInGuard] },
    { path: 'dashboard', component: UserDashboardComponent, canActivate: [LoggedInGuard] },
    { path: 'addbook', component: BookComponent, canActivate: [LoggedInGuard] },
];