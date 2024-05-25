import { Business } from '../../../Helpers/BusinessType';

interface BusinessData {
  business: Business;
  onServiceSelect: (data: BusinessData) => void;
  onNextStep: () => void;
}

const Services: React.FC<BusinessData> = ({
  business,
  onServiceSelect,
  onNextStep,
}) => {
  const handleServiceClick = (service: any) => {
    onServiceSelect(service);
  };

  return (
    <div
      className="card relative max-w-md p-8 bg-slate-100 rounded-lg w-full h-full mb-8 mt-5 mx-7"
      dir="rtl"
    >
      {/* title */}
      <span className="bg-lime-400 absolute top-2 w-10 p-1 rounded-lg"></span>
      <h1 className="text-2xl justify-center flex items-center">
        השירותים שלנו
      </h1>
      {/* services options */}
      <div className="flex flex-col gap-3 mt-4" dir="rtl">
        {business?.services.map((service) => (
          <div
            key={service._id}
            className="bg-white p-3 flex flex-col rounded-md cursor-pointer hover:bg-lime-100"
            dir="rtl"
            onClick={() => handleServiceClick(service)}
          >
            <span className="text-md">{service.name}</span>
            <span className="text-gray-500 text-md">
              {service.price}₪ • {service.serviceTime} דקות
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-8">
        <button
          className="text-md bg-stone-900 text-white rounded-md w-full p-2"
          onClick={onNextStep}
        >
          המשך
        </button>
      </div>
    </div>
  );
};

export default Services;
