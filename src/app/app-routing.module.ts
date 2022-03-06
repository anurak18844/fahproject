import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetComponent } from './components/pages/asset/asset.component';
import { CategoryComponent } from './components/pages/category/category.component';
import { DepartmentComponent } from './components/pages/department/department.component';
import { MainComponent } from './components/pages/main/main.component';
import { UserComponent } from './components/pages/user/user.component';

const routes: Routes = [
  {path: "", component: MainComponent},
  {path: "user", component: UserComponent},
  {path: "asset", component: AssetComponent},
  {path: "category", component: CategoryComponent},
  {path: "department", component: DepartmentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
