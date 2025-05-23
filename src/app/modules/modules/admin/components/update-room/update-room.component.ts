import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from '../../admin-services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-room',
  imports: [SharedModule],
  templateUrl: './update-room.component.html',
  styleUrl: './update-room.component.scss'
})
export class UpdateRoomComponent {
  updateRoomForm: FormGroup;
  id: number; 

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private service: AdminService,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = this.activatedRoute.snapshot.params['id']; 

    this.updateRoomForm = this.fb.group({
      name: [null, Validators.required],
      type: [null, Validators.required],
      price: [null, Validators.required],
    });
    this.getRoomById();
  }

  // ngOnInit(): void {
  //   // this.id = this.activatedRoute.snapshot.params['id'];

  //   // this.activatedRoute.params.subscribe(params => {
  //   //   this.id = params['id'];
  //   // });

    
  // }

  submitForm(){
    this.service.updateRoomDetails(this.id, this.updateRoomForm.value).subscribe(res=>{
      this.message.success(`Room updated successfully`, {nzDuration: 5000});
      this.router.navigateByUrl("/admin/dashboard");
    }, error => {
      this.message.error(`${error.error}`, {nzDuration: 5000})
    })

  }

  getRoomById(){
    this.service.getRoomById(this.id).subscribe(res=>{
      this.updateRoomForm.patchValue(res);
    }, error => {
      this.message.error(`${error.error}`, {nzDuration: 5000})
    })
  }

}
