import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserData, userLogin } from '../model/user.model';
import { UserService } from '../../service/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  @Input() user: userLogin;
  @Input() userdata?: UserData;
  msg: string = "";

  constructor(private service: UserService, private router: Router, private toastr: ToastrService) {
    this.user = new userLogin();
  }

  loginUser() {
    this.service.loginUser(this.user).subscribe(
      data => {
        localStorage.setItem("loggedInUser",JSON.stringify(data));
        this.userdata = data;
        this.toastr.success('User successfully logged in', 'Success', { timeOut: 3000 });

        if (this.userdata.role === "Doctor") {
          this.router.navigate(['doctor']);
        } else {
          this.router.navigate(['patient']);
        }
      },
      error => {
        this.toastr.error(error.error, 'Login Failed', { timeOut: 3000 });
      }
    );
  }
}