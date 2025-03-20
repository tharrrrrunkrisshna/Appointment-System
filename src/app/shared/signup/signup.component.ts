import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../model/user.model';
import { UserService } from '../../service/user/user.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  @Input() user: User;
  msg: String = '';
  visible: boolean = false;

  constructor(private service: UserService, private router: Router, private toastr: ToastrService) {
    this.user = new User();
  }

  addUser() {
    this.service.addUser(this.user).subscribe(
      data => {
        this.toastr.success('Sign-up successful!'); // Success Toaster
        this.router.navigate(['login']);
      },
      error => {
        this.toastr.error(error.error, 'Sign-up Failed'); // Error Toaster
      }
    );
  }

  goToLogin() {
    this.router.navigate(['login']);
  }
}
