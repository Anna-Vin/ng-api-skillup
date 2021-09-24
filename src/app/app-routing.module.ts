import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { PostComponent } from './pages/post/post.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users/:id', component: UserComponent },
  { path: 'posts/:id', component: PostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
