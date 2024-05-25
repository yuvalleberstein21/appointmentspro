import { Business } from './BusinessType';

interface Service {
  business?: Business;
  _id: string;
  name: string;
  price: number;
  serviceTime: number;
}

interface HoursProps {
  business?: Business | null;
  selectedService: Service | null;
  onNextStep: () => void;
  onPrevStep: () => void;
}
