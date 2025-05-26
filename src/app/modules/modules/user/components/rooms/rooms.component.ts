import { Component } from '@angular/core';
import { AdminService } from '../../../admin/admin-services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from '../../service/user.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SharedModule } from '../../../../../shared/shared.module';

@Component({
  selector: 'app-rooms',
  imports: [SharedModule],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent {
  currentPage=1;
  rooms=[];
  total:any;
  loading: false;

  constructor(private service: UserService,
    private message: NzMessageService,
    private modalService: NzModalService,
  ){
    this.getRooms();
  }

  getRooms(){
    this.service.getRooms(this.currentPage-1).subscribe(res=>{
      console.log(res);
      this.rooms = res.roomDtoList;
      this.total = res.totalPages * 10;
    })
  }

  pageIndexChange(value: any){
    this.currentPage = value;
    this.getRooms();
  }  

}
