import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBusinesessAction } from '../../Redux/Actions/BusinessAction';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
      const createdBusiness = dispatch(createBusinesessAction(business));
      if (createdBusiness) {
        navigate(`/business/${createdBusiness.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-4 bg-slate-100 shadow-md rounded-lg mt-5"
      dir="rtl"
    >
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">שם העסק : </label>
        <input
          type="text"
          name="name"
          value={business.name}
          onChange={handleChange}
          className="w-full p-2 border-1 border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">עיר :</label>
        <input
          type="text"
          name="city"
          value={business.city}
          onChange={handleChange}
          className="w-full p-2 border-1 border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">כתובת :</label>
        <input
          type="text"
          name="address"
          value={business.address}
          onChange={handleChange}
          className="w-full p-2 border-1 border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          פרטי השירות :
        </label>
        {business.services.map((service, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              name="name"
              placeholder="שם השירות"
              value={service.name}
              onChange={(e) => handleServiceChange(index, e)}
              className="w-full p-2 border-1 border-gray-300 rounded-md mb-2"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="מחיר השירות"
              value={service.price}
              onChange={(e) => handleServiceChange(index, e)}
              className="w-full p-2 border-1 border-gray-300 rounded-md mb-2"
              required
            />
            <input
              type="number"
              name="serviceTime"
              placeholder="זמן השירות"
              value={service.serviceTime}
              onChange={(e) => handleServiceChange(index, e)}
              className="w-full p-2 border-1 border-gray-300 rounded-md"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addService}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          הוסף שירות
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          ימי פעילות :
        </label>
        {business.workingDays.map((day, index) => (
          <div key={index} className="mb-2">
            <select
              className="w-full p-2 border-1 border-gray-300 rounded-md mb-2"
              name="day"
              onChange={(e) => handleWorkingDayChange(index, e)}
              required
            >
              <option value="">--</option>
              <option value="sunday">ראשון</option>
              <option value="monday">שני</option>
              <option value="tuesday">שלישי</option>
              <option value="wednesday">רביעי</option>
              <option value="thursday">חמישי</option>
              <option value="friday">שישי</option>
            </select>
            <input
              type="time"
              name="startHour"
              placeholder="שעת פתיחה"
              value={day.startHour}
              onChange={(e) => handleWorkingDayChange(index, e)}
              className="w-full p-2 border-1 border-gray-300 rounded-md mb-2"
              required
            />
            <input
              type="time"
              name="endHour"
              placeholder="שעת סגירה"
              value={day.endHour}
              onChange={(e) => handleWorkingDayChange(index, e)}
              className="w-full p-2 border-1 border-gray-300 rounded-md"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addWorkingDay}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          הוסף יום פעילות
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">תמונות :</label>
        {business.images.map((image, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => handleImageChange(index, e)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addImage}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          הוסף תמונה
        </button>
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-500 text-white font-bold rounded-md"
      >
        צור עסק
      </button>
    </form>
  );
};

export default CreateBusinessForm;
