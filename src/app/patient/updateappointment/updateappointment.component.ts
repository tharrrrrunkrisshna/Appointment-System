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
  this.doctorID=this.appointment.doctorID;
  console.log(this.doctorID);
    this.availabilityService.getAvailabilityByDoctor(Number(this.appointment.doctorID)).subscribe(
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

