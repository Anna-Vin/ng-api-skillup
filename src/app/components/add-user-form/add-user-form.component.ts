import { Component, Input, OnInit, Output, EventEmitter  } from '@angular/core';


@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss'],
})
export class AddUserFormComponent implements OnInit {

 @Input() isModalOpen!: boolean;
 @Output() onModalClose: EventEmitter<boolean> = new EventEmitter<boolean>();
 

  public close(status: any) {
    console.log(`Dialog result: ${status}`);
    this.isModalOpen = false;
    this.onModalClose.emit(false);
  }

  public open(): void {
    this.isModalOpen = true;

  }

  constructor() {}

  ngOnInit(): void {}
}
