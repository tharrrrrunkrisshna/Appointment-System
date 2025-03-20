import { Component, OnInit } from '@angular/core';
import { Appointment, AppointmentData } from '../../shared/model/appointment.model';
import { AppointmentService } from '../../service/appointment/appointment.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AvailabilityService } from '../../service/availability/availability.service';

@Component({
  selector: 'app-bookappiontment',
  imports: [FormsModule,CommonModule],
  templateUrl: './bookappiontment.component.html',
  styleUrl: './bookappiontment.component.css'
})
export class BookAppointmentComponent implements OnInit {
  doctor!: any;
  user!: any;
  availabilities: any[] = [];
  selectedDate!: string;
  selectedTime!: string;
  selectedTimeSlots: string[] = [];

  constructor(
    private appointmentService: AppointmentService,
    private availabilityService: AvailabilityService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.doctor = navigation?.extras.state?.['doctor'];  // Get Doctor Data
    this.user = navigation?.extras.state?.['user'];  // Get Patient Data
  }

  ngOnInit(): void {
    if (!this.doctor || !this.user) {
      alert('Invalid access! Returning to patient dashboard.');
      this.router.navigate(['/patient']);
      return;
    }
    this.fetchAvailability();
  }

  fetchAvailability() {
    this.availabilityService.getAvailabilityByDoctor(this.doctor.userID).subscribe(
      (data) => {
        this.availabilities = data;
      },
      (error) => {
        console.error('Error fetching availability:', error);
      }
    );
  }

  selectDate(availability: any) {
    this.selectedDate = availability.date;
    this.selectedTimeSlots = availability.timeSlots;
    this.selectedTime = ''; // Reset selected time
  }

  selectTime(time: string) {
    this.selectedTime = time;
  }

  bookAppointment() {
    if (!this.selectedDate || !this.selectedTime) return;

    const appointment: AppointmentData = {
      patientID: this.user.userID,  // Use logged-in patient ID
      doctorID: this.doctor.userID, // Use selected doctor ID
      timeSlot: `${this.selectedDate}T${this.selectedTime}`,
      status: 'Booked'
    };

    console.log(appointment);

    this.appointmentService.bookAppointment(appointment).subscribe(
      (response) => {
        console.log('Appointment booked:', response);
        alert('Appointment booked successfully!');
      },
      (error) => {
        console.error('Error booking appointment:', error);
        alert('Failed to book appointment.');
      }
    );
  }
}