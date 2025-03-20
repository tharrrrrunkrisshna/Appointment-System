import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../service/appointment/appointment.service';
import { Router } from '@angular/router';
import { UserData } from '../../shared/model/user.model';
import { Appointment, AppointmentData } from '../../shared/model/appointment.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-past-appointments',
  imports: [CommonModule,FormsModule],
  templateUrl: './past-appointments.component.html',
  styleUrl: './past-appointments.component.css'
})

export class PastAppointmentsComponent implements OnInit {
  user: UserData;
  appointments: AppointmentData[] = [];

  constructor(
    private router: Router,
    private appointmentService: AppointmentService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.user = navigation?.extras.state?.['user'];
  }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getAppointmentsByDoctor(Number(this.user.userID)).subscribe(
      (data: AppointmentData[]) => {
        this.appointments = data;
      },
      (error) => {
        console.error('Error fetching appointments', error);
      }
    );
  }

  cancelAppointment(appointmentID: number): void {
    this.appointmentService.cancelAppointment(appointmentID).subscribe(
      (data: AppointmentData) => {
        console.log('Appointment cancelled:', data);
        this.loadAppointments(); // Refresh the list after cancellation
      },
      (error) => {
        console.error('Error cancelling appointment', error);
      }
    );
  }

}
