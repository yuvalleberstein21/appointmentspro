export interface Business {
  _id?: string;
  name: string;
  city: string;
  address: string;
  services: [
    {
      _id: string;
      name: string;
      price: number;
      serviceTime: number;
    }
  ];
  workingDays: [{}];
  images: [string];
  owner: string;
}

export interface EditBusinessFormProps {
  selectedBusiness: Business;
}
