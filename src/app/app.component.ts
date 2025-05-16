import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { UserStorageService } from './auth/services/storage/user-storage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Hotel';

  isUserLoggedIn:boolean = UserStorageService.isUserLoggedIn();
  isAdminLoggedIn:boolean = UserStorageService.isAdminLoggedIn();

  constructor(private router: Router){}

  ngOnInit(){
    this.router.events.subscribe(event=>{
      if(event.constructor.name === "NavigationEnd"){
        this.isUserLoggedIn = UserStorageService.isUserLoggedIn();
        this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
      }
    })
  }

  logout(){
    UserStorageService.signOut();
    this.router.navigateByUrl('/login');
  }
}
