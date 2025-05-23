import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { UserStorageService } from '../../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private service: AuthService,
    private message: NzMessageService,
    private router: Router
  ){}

  ngOnInit(){
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, Validators.required],
    })
  }

  submitForm(){
    this.service.login(this.loginForm.value).subscribe(res=>{
      console.log(res);

      if(res.userId != null){
        const user = {
          id: res.userId,
          role: res.userRole
        }

        UserStorageService.saveUser(user);
        UserStorageService.saveToken(res.jwt);

        if(UserStorageService.isAdminLoggedIn()){
          this.router.navigateByUrl("/admin/dashboard");
        } else if(UserStorageService.isUserLoggedIn()){
          this.router.navigateByUrl("/user/rooms");
        }

        console.log("UserStorageService.isAdminLoggedIn() ", UserStorageService.isAdminLoggedIn())
        console.log("UserStorageService.isUserLoggedIn() ", UserStorageService.isUserLoggedIn())
      }
        // this.message.success("Login successfull", {nzDuration: 5000});
        // this.router.navigateByUrl("/");
      // } else {
      //   this.message.error(`${res.message}`, {nzDuration: 5000});
      // }

       this.message.success("Login successfull", {nzDuration: 5000});
    }, error=>{
      this.message.error('Bad credentials', {nzDuration: 5000})
    });
  }

}
