import { Business } from './BusinessType';
import { Service } from './ServiceType';

export interface AppointmentData {
  _id: string;
  appointmentDate: string;
  appointmentTime: string;
  business: Business;
  service: Service;
  user: string;
  appointments: AppointmentData[];
  loading: boolean;
  confirmed: boolean;
}
