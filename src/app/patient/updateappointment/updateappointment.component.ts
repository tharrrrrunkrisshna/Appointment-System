import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../../service/appointment/appointment.service';
import { AvailabilityService } from '../../service/availability/availability.service';
import { CommonModule } from '@angular/common';
import { AppointmentData } from '../../shared/model/appointment.model';

@Component({
  selector: 'app-updateappointment',
  imports: [CommonModule],
  templateUrl: './updateappointment.component.html',
  styleUrl: './updateappointment.component.css'
})
export class UpdateappointmentComponent implements OnInit {
  doctorID:number=0;
  appointment:AppointmentData;
  availabilities: any[] = [];
  selectedDate!: string;
  selectedTime!: string;
  selectedTimeSlots: string[] = [];

  constructor(private router: Router, 
    private appointmentService: AppointmentService,
    private availabilityService: AvailabilityService) {
    const navigation = this.router.getCurrentNavigation();
    this.appointment = navigation?.extras.state?.['appointment'];
  }

  ngOnInit(): void {
    this.fetchAvailability();
  }

  fetchAvailability() {
    const today = new Date(); // Get today's date
    const currentTime = today.getHours() + ':' + today.getMinutes(); // Get current time in HH:MM format
 
    this.availabilityService.getAvailabilityByDoctor(this.appointment.doctorID).subscribe(
      (data) => {
        this.availabilities = data.map(availability => {
          const availabilityDate = new Date(availability.date);
          if (availabilityDate > today) {
            // If the date is in the future, keep all timeslots
            return availability;
          } else if (availabilityDate.toDateString() === today.toDateString()) {
            // If the date is today, filter timeslots based on current time
            availability.timeSlots = availability.timeSlots.filter(timeSlot => timeSlot > currentTime);
            return availability;
          }
          // If the date is in the past, exclude the availability
          return null;
        }).filter(availability => availability !== null);
        console.log(this.availabilities);
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

  updateAppointment() {
    if (!this.selectedDate || !this.selectedTime) return;

    const newTimeSlot = `${this.selectedDate}T${this.selectedTime}`;

    this.appointmentService.updateAppointment(Number(this.appointment.appointmentID), newTimeSlot).subscribe(
      (response) => {
        console.log('Appointment updated:', response);
        alert('Appointment updated successfully!');
        this.router.navigate(['/appointment/edit']);
      },
      (error) => {
        console.error('Error updating appointment:', error);
        alert('Failed to update appointment.');
      }
    );
  }
}

