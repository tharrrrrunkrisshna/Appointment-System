import { Component, Input, OnInit } from '@angular/core';
import { User, UserData } from '../../shared/model/user.model';
import { Router } from '@angular/router';
import { ProfileComponent } from '../../shared/profile/profile.component';
import { UserService } from '../../service/user/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../service/appointment/appointment.service';
import { DoctorCardComponent } from '../doctor-card/doctor-card.component';
import { NavbarComponent } from "../../shared/navbar/navbar.component";

@Component({
  selector: 'app-patient-dashboard',
  imports: [ProfileComponent, CommonModule, FormsModule, DoctorCardComponent, NavbarComponent],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.css'
})
export class PatientDashboardComponent implements OnInit {
  user: UserData={};
  appointments: any[] = [];
  doctors: any[] = [];

  constructor(private router: Router, private userService: UserService) {
    const storedUser = localStorage.getItem('loggedInUser');
    if(storedUser){
      this.user = JSON.parse(storedUser);
    }else{
      alert('Session expired, Please login again.')
    }
  }

  ngOnInit(): void {
    
    this.fetchDoctors();
  }


  fetchDoctors(): void {
    this.userService.getUsersByRole('doctor').subscribe(
      (data) => {
        this.doctors = data;
      },
      (error) => {
        console.error('Error fetching doctors', error);
      }
    );
  }

  goToEditAppointments() {
    this.router.navigate(['appointment/edit'], { state: { user: this.user } });
  }
}
