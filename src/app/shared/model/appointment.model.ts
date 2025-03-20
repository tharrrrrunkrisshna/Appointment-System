export interface Appointment {
    appointmentID?: number;
    patientID: number;
    doctorID: number;
    timeSlot: string; // Use string to handle datetime input
  }
  export interface AppointmentData {
    appointmentID?: number;
    patientID: number;
    doctorID: number;
    timeSlot: string; // Use string to handle datetime input
    status: string; // Default status is "booked"
  }