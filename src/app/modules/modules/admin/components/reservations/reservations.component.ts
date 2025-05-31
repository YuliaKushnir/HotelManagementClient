import { Component } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SharedModule } from '../../../../../shared/shared.module';

@Component({
  selector: 'app-reservations',
  imports: [SharedModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})
export class ReservationsComponent {

  currentPage: any = 1;
  total: any;

  reservations: any;

  constructor(private service: AdminService,
    private message: NzMessageService
  ){
    this.getReservations();
  }

  getReservations(){
    this.service.getReservations(this.currentPage-1).subscribe(res=>{
      console.log(res);
      this.reservations = res.reservations;
      this.total = res.totalPages * 5;
    })
  }

  pageIndexChange(value: any){
    this.currentPage = value;

    this.getReservations();
  }

  changeReservationStatus(bookingId:number, status:string){
    this.service.changeReservationStatus(bookingId, status).subscribe(res=>{
      this.message.success(`Reservation status changed`, {nzDuration: 5000});

      this.getReservations();
    }, error=> {
      this.message.error(`${error.error}`, {nzDuration: 5000});
    })

  }


}
