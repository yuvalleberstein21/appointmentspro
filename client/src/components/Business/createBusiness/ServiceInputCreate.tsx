import { Service } from '../../../Helpers/ServiceType';

const ServiceInputCreate: React.FC<{
  services: { _id: string; name: string; price: number; serviceTime: number }[];
  handleChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddField: () => void;
  handleRemoveField: (index: number) => void;
}> = ({ services, handleChange, handleAddField, handleRemoveField }) => (
  <div className="mb-4">
    <label className="block text-gray-800 font-bold mb-2 text-center text-lg">
      שירותים :
    </label>
    {services.map((service: Service, index: number) => (
      <div key={index} className="mb-2">
        <input
          type="text"
          name="name"
          placeholder="שם השירות"
          value={service.name}
          onChange={(e) => handleChange(index, e)}
          className="w-full p-2 border-1 border-gray-300 rounded-md mb-2"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="מחיר השירות"
          value={service.price}
          onChange={(e) => handleChange(index, e)}
          className="w-full p-2 border-1 border-gray-300 rounded-md mb-2"
          required
        />
        <input
          type="number"
          name="serviceTime"
          placeholder="זמן השירות"
          value={service.serviceTime}
          onChange={(e) => handleChange(index, e)}
          className="w-full p-2 border-1 border-gray-300 rounded-md"
          required
        />
        <button
          type="button"
          className="bg-gray-500 p-2 text-white rounded-md text-sm mt-2"
          onClick={() => handleRemoveField(index)}
        >
          הסר שירות
          <i className="fa-solid fa-trash p-1"></i>
        </button>
      </div>
    ))}
    <button
      type="button"
      className="bg-blue-500 p-2 text-white rounded-md text-sm mt-2"
      onClick={handleAddField}
    >
      הוסף שירות
      <i className="fa-solid fa-plus p-1"></i>
    </button>
  </div>
);

export default ServiceInputCreate;
