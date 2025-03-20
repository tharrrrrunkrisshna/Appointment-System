import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../../service/appointment/appointment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-appointment',
  imports: [CommonModule],
  templateUrl: './edit-appointment.component.html',
  styleUrl: './edit-appointment.component.css'
})
export class EditAppointmentComponent implements OnInit {
    user: any;
    appointments: any[] = [];
  
    constructor(private router: Router, private appointmentService: AppointmentService) {
      const navigation = this.router.getCurrentNavigation();
      this.user = navigation?.extras.state?.['user'];
    }
  
    ngOnInit(): void {
      if (!this.user) {
        alert('Invalid access! Returning to patient dashboard.');
        this.router.navigate(['/patient']);
        return;
      }
      this.fetchAppointments();
    }
  
    fetchAppointments() {
      this.appointmentService.getAppointmentsByPatient(this.user.userID).subscribe(
        (data) => {
          this.appointments = data.filter(app => app.status === 'Booked'); // Show only booked appointments
        },
        (error) => {
          console.error('Error fetching appointments:', error);
        }
      );
    }

    cancelAppointment(appointmentID: number) {
      if (confirm('Are you sure you want to cancel this appointment?')) {
        this.appointmentService.cancelAppointment(appointmentID).subscribe(() => {
          alert('Appointment canceled successfully.');
          this.fetchAppointments(); // Refresh the list after canceling
        });
      }
    }
  
    editAppointment(appointment: any) {
      console.log(appointment);
      this.router.navigate(['appointment/update'], { state: { appointment: appointment } });
    }
  }