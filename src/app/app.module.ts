import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { AssetComponent } from './components/pages/asset/asset.component';
import { CategoryComponent } from './components/pages/category/category.component';
import { DepartmentComponent } from './components/pages/department/department.component';
import { UserComponent } from './components/pages/user/user.component';
import { MainComponent } from './components/pages/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AssetComponent,
    CategoryComponent,
    DepartmentComponent,
    UserComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
