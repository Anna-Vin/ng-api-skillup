import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from './../../models/User';
import { UserService } from 'src/app/services/user.service';
import { HomePageUser } from './../../models/homepageUser';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss'],
})
export class AddUserFormComponent implements OnInit, OnDestroy {
  public addUserForm!: FormGroup;
  public newUserId!: number;
  private getSub!: Subscription;

  @Input() users!: HomePageUser[];
  @Input() isModalOpen!: boolean;
  @Output() onModalClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onFormSubmit: EventEmitter<void> = new EventEmitter<void>();

  public close(): void {
    this.addUserForm.reset();
    this.onModalClose.emit(false);
  }

  public open(): void {
    this.isModalOpen = true;
  }

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.newUserId = this.userService.generateNewUserId(this.users);
    this.addUserForm = new FormGroup({
      id: new FormControl(this.newUserId),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormGroup({
        street: new FormControl('', Validators.required),
        building: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        zipcode: new FormControl('', Validators.required),
      }),
      phone: new FormControl('', Validators.required),
      website: new FormControl('', Validators.required),
      company: new FormGroup({
        name: new FormControl('', Validators.required),
        scope: new FormControl('', Validators.required),
      }),
    });
  }

  ngOnDestroy(): void {
    this.getSub?.unsubscribe();
  }

  public createUserHandler(): void {
    const userData: User = this.addUserForm.value;
    this.userService.createUser(userData).subscribe();
    this.getSub = this.userService.getUsers().subscribe();
    this.onFormSubmit.emit();
    this.onModalClose.emit(false);
  }
}
