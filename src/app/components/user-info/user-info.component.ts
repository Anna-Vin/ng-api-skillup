import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import {
  CancelEvent,
  EditEvent,
  ListViewDataResult,
  SaveEvent,
} from '@progress/kendo-angular-listview';
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
  public isLoaded: boolean = false;
  public isUserExists: boolean = true;
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
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.userService.userIdSubject.next(this.userId);
      this.getUserInfo(this.userId);
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
    this.updateSub?.unsubscribe();
  }

  public getUserInfo(id: number): void {
    this.userSub = this.userService.getSingleUserInfo(id).subscribe(
      (userResp: User) => {
        this.listDataSubject.next({ data: [userResp], total: 1 });
        this.isLoaded = true;
      },
      () => {
        this.isUserExists = false;
        this.userService.isUserExistSubject.next(false);
      }
    );
  }

  public editHandler({ sender, dataItem, itemIndex }: EditEvent): void {
    this.formGroup = new FormGroup({
      id: new FormControl(dataItem.id),
      firstName: new FormControl(dataItem.firstName, Validators.required),
      lastName: new FormControl(dataItem.lastName, Validators.required),
      username: new FormControl(dataItem.username, Validators.required),
      email: new FormControl(dataItem.email, Validators.required),
      address: new FormGroup({
        street: new FormControl(dataItem.address.street, Validators.required),
        building: new FormControl(
          dataItem.address.building,
          Validators.required
        ),
        city: new FormControl(dataItem.address.city, Validators.required),
        zipcode: new FormControl(dataItem.address.zipcode, Validators.required),
      }),
      phone: new FormControl(dataItem.phone, Validators.required),
      website: new FormControl(dataItem.website, Validators.required),
      company: new FormGroup({
        name: new FormControl(dataItem.company.name, Validators.required),
        scope: new FormControl(dataItem.company.scope, Validators.required),
      }),
    });

    sender.editItem(itemIndex, this.formGroup);
  }

  public cancelHandler({ sender, itemIndex }: CancelEvent): void {
    sender.closeItem(itemIndex);
  }

  public saveHandler({ sender, itemIndex, formGroup }: SaveEvent): void {
    const user: User = formGroup.value;
    this.updateSub = this.userService.updateUser(user).subscribe(() => {
      this.getUserInfo(user.id);
      sender.closeItem(itemIndex);
    });
  }
}
