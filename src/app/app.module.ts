import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { PostComponent } from './pages/post/post.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { AddUserFormComponent } from './components/add-user-form/add-user-form.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';


@NgModule({
  declarations: [AppComponent, HomeComponent, UserComponent, PostComponent, AddUserFormComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonsModule,
    BrowserAnimationsModule,
    GridModule,
    DialogsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
