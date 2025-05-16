import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';

export const routes: Routes = [
    { path:"", component:LoginComponent },
    { path:"register", component:RegisterComponent },
    { path:"login", component:LoginComponent },
    { path:"user", loadChildren: () => import("./modules/modules/user/user.module").then(m => m.UserModule)},
    { path:"admin", loadChildren: () => import("./modules/modules/admin/admin.module").then(m => m.AdminModule)},
];
