import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './components/rooms/rooms.component';
import { ViewBookingsComponent } from './components/view-bookings/view-bookings.component';

const routes: Routes = [
  {path: 'rooms', component: RoomsComponent},
  {path: 'bookings', component: ViewBookingsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
