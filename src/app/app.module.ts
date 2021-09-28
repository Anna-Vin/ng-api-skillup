import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { PostComponent } from './components/postItem/post.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { AddUserFormComponent } from './components/add-user-form/add-user-form.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { ListViewModule } from '@progress/kendo-angular-listview';
import { ReactiveFormsModule } from '@angular/forms';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { LabelModule } from '@progress/kendo-angular-label';
import { PostsComponent } from './components/posts/posts.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { CommentsComponent } from './components/comments/comments.component';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';






@NgModule({
  declarations: [AppComponent, HomeComponent, UserComponent, PostComponent, AddUserFormComponent, UserInfoComponent, PostsComponent, CommentsComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonsModule,
    BrowserAnimationsModule,
    GridModule,
    DialogsModule,
    ListViewModule,
    ReactiveFormsModule,
    LabelModule,
    LayoutModule,
    IndicatorsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
