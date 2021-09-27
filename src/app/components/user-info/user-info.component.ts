import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { CancelEvent, EditEvent, ListViewDataResult, SaveEvent } from '@progress/kendo-angular-listview';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  public userId!: number;
  public formGroup!: FormGroup;
  public listDataSubject!: BehaviorSubject<ListViewDataResult>;
  private routeSub!: Subscription;
  private userSub!: Subscription;
  private updateSub!: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  get listData$(): Observable<ListViewDataResult> {
    return this.listDataSubject.asObservable();
  }

  ngOnInit(): void {
    this.listDataSubject = new BehaviorSubject({
      data: [] as User[],
      total: 0,
    });
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.getUserInfo(this.userId);
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.userSub.unsubscribe();
    this.updateSub.unsubscribe();
  }

  public getUserInfo(id: number): void {
    this.userSub = this.userService
      .getSingleUserInfo(id)
      .subscribe((userResp: User) => {
        this.listDataSubject.next({ data: [userResp], total: 1 });
      });
  }

  editHandler({ sender, dataItem, itemIndex }: EditEvent): void {
    this.formGroup = new FormGroup({
      id: new FormControl(dataItem.id),
      firstName: new FormControl(dataItem.firstName),
    });

    sender.editItem(itemIndex, this.formGroup);
  }

  cancelHandler({ sender, itemIndex }: CancelEvent): void {
    sender.closeItem(itemIndex);
  }

  saveHandler({ sender, itemIndex, formGroup }: SaveEvent): void {
    const user: User = formGroup.value;
    this.userService.updateUser(user).subscribe(() => {
      this.getUserInfo(user.id);
      sender.closeItem(itemIndex);
    });
    
  }
}
