import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetComponent } from './components/pages/asset/asset.component';
import { CategoryComponent } from './components/pages/category/category.component';
import { DepartmentComponent } from './components/pages/department/department.component';
import { LoginComponent } from './components/pages/login/login.component';
import { MainComponent } from './components/pages/main/main.component';
import { UserComponent } from './components/pages/user/user.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  {path: "", component: MainComponent},
  {path: "user", component: UserComponent, canActivate: [ AuthGuard ]},
  {path: "asset", component: AssetComponent, canActivate: [ AuthGuard ]},
  {path: "category", component: CategoryComponent, canActivate: [ AuthGuard ]},
  {path: "department", component: DepartmentComponent, canActivate: [ AuthGuard ]},
  {path: "login", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
