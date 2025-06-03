import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SharedModule } from '../../../../../shared/shared.module';

@Component({
  selector: 'app-view-bookings',
  imports: [SharedModule],
  templateUrl: './view-bookings.component.html',
  styleUrl: './view-bookings.component.scss'
})
export class ViewBookingsComponent {

  currentPage: any = 1;

  total: any;
  bookings: any;

  constructor(private service: UserService,
    private message: NzMessageService
  ){
    this.getBookings();
  }

  getBookings(){
    this.service.getMyBookings(this.currentPage-1).subscribe(res=>{
      console.log(res);

      this.bookings = res.reservations;
      this.total = res.totalPages * 5;
    }, error=> {
      this.message.error(`${error.error}`, {nzDuration: 5000});
    })
  }

  pageIndexChange(value: any){
    this.currentPage = value;
    this.getBookings();
  }

}
