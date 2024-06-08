import { Business } from './BusinessType';

export interface Service {
  business?: Business;
  _id: string;
  name: string;
  price: number;
  serviceTime: number;
}

export interface HoursProps {
  business?: Business | any;
  selectedService: Service;
  selectedDate: Date;
  selectedHour: string;
  businessId: any;
  onHourSelect: (hour: string) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  onSubmit: () => void;
}
