import TextInput from './TextInput';

const ServiceInput: React.FC<{
  services: { _id: string; name: string; price: number; serviceTime: number }[];
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    type: string
  ) => void;
  handleAddField: (type: string) => void;
  handleRemoveField: (index: number, type: string) => void;
}> = ({ services, handleChange, handleAddField, handleRemoveField }) => (
  <div className="mb-4">
    <label className="block text-gray-800 font-bold mb-2 text-center text-lg">
      שירותים :
    </label>
    {services.map((service, index) => (
      <div key={index}>
        <TextInput
          type="text"
          label="שם השירות"
          name="name"
          value={service.name}
          onChange={(e) => handleChange(e, index, 'services')}
        />
        <TextInput
          type="text"
          label="מחיר השירות"
          name="price"
          value={service.price}
          onChange={(e) => handleChange(e, index, 'services')}
        />
        <TextInput
          type="text"
          label="זמן השירות"
          name="serviceTime"
          value={service.serviceTime}
          onChange={(e) => handleChange(e, index, 'services')}
        />
        <button
          type="button"
          className="bg-gray-500 p-2 text-white rounded-md text-sm mt-2 justify-between"
          onClick={() => handleRemoveField(index, 'services')}
        >
          הסר שירות
          <i className="fa-solid fa-trash p-1"></i>
        </button>
      </div>
    ))}
    <button
      type="button"
      className="bg-blue-500 p-2 text-white rounded-md text-sm mt-2 justify-between"
      onClick={() => handleAddField('services')}
    >
      הוסף שירות
      <i className="fa-solid fa-plus p-1"></i>
    </button>
  </div>
);

export default ServiceInput;
