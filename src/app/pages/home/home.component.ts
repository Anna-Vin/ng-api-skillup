import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/User';
import { HomePageUser } from '../../models/homepageUser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public users!: HomePageUser[];
  public isModalOpen: boolean = false;
  private usersSub!: Subscription;
  private userToShow!: HomePageUser;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.usersSub = this.userService
      .getUsers()
      .subscribe((usersResp: User[]) => {
        this.users = usersResp.map((user) => {
          return this.userService.mapUserForTable(user);
        });
      });
  }

  ngOnDestroy(): void {
    this.usersSub.unsubscribe();
  }

  public getRowUserInfo({ dataItem }: { dataItem: HomePageUser }): void {
    this.userToShow = dataItem;
    console.log(this.userToShow);
  }

  public rowClickHandler(): void {
    this.router.navigate(['users', this.userToShow.id]);
  }

  public openModal(): void {
    this.isModalOpen = true;
  }

  public closeModal(): void {
    this.isModalOpen = false;
  }
}
