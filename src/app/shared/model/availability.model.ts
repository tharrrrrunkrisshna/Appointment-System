export interface Availability {
    availabilityID?: number;
    doctorID: number;
    date: string; // Use string to handle date input
    timeSlots: string[]; // Use string array to handle time input
  }