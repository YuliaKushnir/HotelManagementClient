import { Component } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SharedModule } from '../../../../../shared/shared.module';

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
    private message: NzMessageService
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
