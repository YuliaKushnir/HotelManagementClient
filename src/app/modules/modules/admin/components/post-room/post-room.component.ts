import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SharedModule } from '../../../../../shared/shared.module';
import { AdminService } from '../../admin-services/admin.service';

@Component({
  selector: 'app-post-room',
  imports: [SharedModule],
  templateUrl: './post-room.component.html',
  styleUrl: './post-room.component.scss',
})
export class PostRoomComponent {
  roomDetailsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private service: AdminService
  ) {}

  ngOnInit(): void {
    this.roomDetailsForm = this.fb.group({
      name: [null, Validators.required],
      type: [null, Validators.required],
      price: [null, Validators.required],
    });
  }

  submitForm():void {
    console.log('this.roomDetailsForm.value ', this.roomDetailsForm.value);
    this.service.postRoomDetails(this.roomDetailsForm.value).subscribe(
      (res) => {
        this.message.success(`Room added successfully`, { nzDuration: 5000 });
        this.router.navigateByUrl('/admin/dashboard');
      },
      (error) => {
        this.message.error(`${error.error}`, { nzDuration: 5000 });
      }
    );
  }
}
