export interface Business {
  _id?: string;
  name: string;
  city: string;
  address: string;
  services: [];
  workingDays: [{}];
  images: [string];
  owner: string;
}
