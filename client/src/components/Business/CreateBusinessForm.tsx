import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBusinesessAction } from '../../Redux/Actions/BusinessAction';

const CreateBusinessForm = () => {
  const [business, setBusiness] = useState({
    name: '',
    city: '',
    address: '',
    services: [{ name: '', price: '', serviceTime: '' }],
    workingDays: [{ day: '', startHour: '', endHour: '' }],
    images: [''],
  });

  const dispatch = useDispatch<any>();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setBusiness({ ...business, [name]: value });
  };

  const handleServiceChange = (index: number, e: any) => {
    const { name, value } = e.target;
    const newServices = [...business.services];
    newServices[index][name] = value;
    setBusiness({ ...business, services: newServices });
  };

  const handleWorkingDayChange = (index: number, e: any) => {
    const { name, value } = e.target;
    const newWorkingDays = [...business.workingDays];
    newWorkingDays[index][name] = value;
    setBusiness({ ...business, workingDays: newWorkingDays });
  };

  const handleImageChange = (index: number, e: any) => {
    const { value } = e.target;
    const newImages = [...business.images];
    newImages[index] = value;
    setBusiness({ ...business, images: newImages });
  };

  const addService = () => {
    setBusiness({
      ...business,
      services: [
        ...business.services,
        { name: '', price: '', serviceTime: '' },
      ],
    });
  };

  const addWorkingDay = () => {
    setBusiness({
      ...business,
      workingDays: [
        ...business.workingDays,
        { day: '', startHour: '', endHour: '' },
      ],
    });
  };

  const addImage = () => {
    setBusiness({ ...business, images: [...business.images, ''] });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    try {
      dispatch(createBusinesessAction(business));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg"
    >
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Name:</label>
        <input
          type="text"
          name="name"
          value={business.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">City:</label>
        <input
          type="text"
          name="city"
          value={business.city}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Address:</label>
        <input
          type="text"
          name="address"
          value={business.address}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Services:</label>
        {business.services.map((service, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              name="name"
              placeholder="Service Name"
              value={service.name}
              onChange={(e) => handleServiceChange(index, e)}
              className="w-full p-2 border rounded-md mb-2"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={service.price}
              onChange={(e) => handleServiceChange(index, e)}
              className="w-full p-2 border rounded-md mb-2"
            />
            <input
              type="number"
              name="serviceTime"
              placeholder="Service Time"
              value={service.serviceTime}
              onChange={(e) => handleServiceChange(index, e)}
              className="w-full p-2 border rounded-md"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addService}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Service
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Working Days:
        </label>
        {business.workingDays.map((day, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              name="day"
              placeholder="Day"
              value={day.day}
              onChange={(e) => handleWorkingDayChange(index, e)}
              className="w-full p-2 border rounded-md mb-2"
            />
            <input
              type="time"
              name="startHour"
              placeholder="Start Hour"
              value={day.startHour}
              onChange={(e) => handleWorkingDayChange(index, e)}
              className="w-full p-2 border rounded-md mb-2"
            />
            <input
              type="time"
              name="endHour"
              placeholder="End Hour"
              value={day.endHour}
              onChange={(e) => handleWorkingDayChange(index, e)}
              className="w-full p-2 border rounded-md"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addWorkingDay}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Working Day
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Images:</label>
        {business.images.map((image, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => handleImageChange(index, e)}
              className="w-full p-2 border rounded-md"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addImage}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Image
        </button>
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-500 text-white font-bold rounded-md"
      >
        Create Business
      </button>
    </form>
  );
};

export default CreateBusinessForm;
