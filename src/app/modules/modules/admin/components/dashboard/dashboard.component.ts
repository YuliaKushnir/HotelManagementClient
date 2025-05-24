import { Component } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SharedModule } from '../../../../../shared/shared.module';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-dashboard',
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  currentPage=1;
  rooms=[];
  total:any;
  loading: false;

  constructor(private service: AdminService,
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

  showConfirm(roomId: number){
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Do you want to delete this room?',
      nzOkText: 'Delete',
      nzCancelText: 'Cancel',
      nzOnOk: () => this.deleteRoom(roomId),
    })
  }

  deleteRoom(roomId:number){
    this.service.deleteRoomById(roomId).subscribe(res=>{
      this.message.success(`Room deleted sucessfully`, {nzDuration: 5000 });
      this.getRooms();
    }, error => {
      this.message.error(`${error.error}`, {nzDuration: 5000 });
    });
  }

}
