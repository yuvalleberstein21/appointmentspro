import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Business } from '../../Helpers/BusinessType';
import { editBusinesessAction } from '../../Redux/Actions/BusinessAction';

const EditBusinessForm = (selectedBusiness: Business) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: any) => state.userLogin);

  const [formData, setFormData] = useState({
    name: '',
    city: '',
    address: '',
    services: [{ _id: '', name: '', price: '', serviceTime: '' }],
    workingDays: [{ day: '', startHour: '', endHour: '' }],
    images: [''],
  });

  console.log(selectedBusiness);

  const handleChange = (e: any, index: number, type: string) => {
    const { name, value } = e.target;
    if (type === 'services') {
      const services = [...formData.services];
      services[index][name] = value;
      setFormData({ ...formData, services });
    } else if (type === 'workingDays') {
      const workingDays = [...formData.workingDays];
      workingDays[index][name] = value;
      setFormData({ ...formData, workingDays });
    } else if (type === 'images') {
      const images = [...formData.images];
      images[index] = value;
      setFormData({ ...formData, images });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddField = (type: string) => {
    if (type === 'services') {
      setFormData({
        ...formData,
        services: [
          ...formData.services,
          { _id: '', name: '', price: '', serviceTime: '' },
        ],
      });
    } else if (type === 'workingDays') {
      setFormData({
        ...formData,
        workingDays: [
          ...formData.workingDays,
          { day: '', startHour: '', endHour: '' },
        ],
      });
    } else if (type === 'images') {
      setFormData({
        ...formData,
        images: [...formData.images, ''],
      });
    }
  };

  const handleRemoveField = (index: number, type: string) => {
    if (type === 'services') {
      const services = [...formData.services];
      services.splice(index, 1);
      setFormData({ ...formData, services });
    } else if (type === 'workingDays') {
      const workingDays = [...formData.workingDays];
      workingDays.splice(index, 1);
      setFormData({ ...formData, workingDays });
    } else if (type === 'images') {
      const images = [...formData.images];
      images.splice(index, 1);
      setFormData({ ...formData, images });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // dispatch(editBusinesessAction(businessId, formData));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-4 bg-slate-100 shadow-md rounded-lg mt-5"
      dir="rtl"
    >
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">שם העסק :</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          className="w-full p-2 border-1 border-gray-300 rounded-md"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">עיר :</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          className="w-full p-2 border-1 border-gray-300 rounded-md"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">כתובת :</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          className="w-full p-2 border-1 border-gray-300 rounded-md"
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 font-bold mb-2 text-center text-lg">
          שירותים :
        </label>
        {formData.services.map((service, index) => (
          <div key={index}>
            <label className="block text-gray-700 font-bold mb-2 mt-2">
              שם השירות :
            </label>
            <input
              type="text"
              name="name"
              value={service.name}
              className="w-full p-2 border-1 border-gray-300 rounded-md"
              onChange={(e) => handleChange(e, index, 'services')}
            />
            <label className="block text-gray-800 font-bold mb-2 mt-2">
              מחיר השירות :
            </label>
            <input
              type="number"
              name="price"
              value={service.price}
              className="w-full p-2 border-1 border-gray-300 rounded-md"
              onChange={(e) => handleChange(e, index, 'services')}
            />
            <label className="block text-gray-800 font-bold mb-2 mt-2">
              זמן השירות :
            </label>
            <input
              type="number"
              name="serviceTime"
              value={service.serviceTime}
              className="w-full p-2 border-1 border-gray-300 rounded-md"
              onChange={(e) => handleChange(e, index, 'services')}
            />
            <button
              type="button"
              className="bg-red-700 p-2 text-white rounded-md text-sm mt-2 justify-between"
              onClick={() => handleRemoveField(index, 'services')}
            >
              מחק שירות זה
            </button>
          </div>
        ))}
        <button
          type="button"
          className="bg-blue-800 p-2 text-white rounded-md text-sm mt-2 justify-between"
          onClick={() => handleAddField('services')}
        >
          הוסף שירות
        </button>
      </div>

      <div>
        <label className="block text-gray-800 font-bold mb-2 mt-2 text-center text-lg">
          ימי פעילות :
        </label>
        {formData.workingDays.map((day, index) => (
          <div key={index}>
            <label className="block text-gray-800 font-bold mb-2 mt-2">
              יום :
            </label>
            <input
              type="text"
              name="day"
              value={day.day}
              className="w-full p-2 border-1 border-gray-300 rounded-md"
              onChange={(e) => handleChange(e, index, 'workingDays')}
            />
            <label className="block text-gray-800 font-bold mb-2 mt-2">
              תחילת יום עבודה :
            </label>
            <input
              type="time"
              name="startHour"
              value={day.startHour}
              className="w-full p-2 border-1 border-gray-300 rounded-md"
              onChange={(e) => handleChange(e, index, 'workingDays')}
            />
            <label className="block text-gray-800 font-bold mb-2">
              סיום יום עבודה :
            </label>
            <input
              type="time"
              name="endHour"
              value={day.endHour}
              className="w-full p-2 border-1 border-gray-300 rounded-md"
              onChange={(e) => handleChange(e, index, 'workingDays')}
            />
            <button
              type="button"
              className="bg-red-700 p-2 text-white rounded-md text-sm mt-2"
              onClick={() => handleRemoveField(index, 'workingDays')}
            >
              מחק יום עבודה
            </button>
          </div>
        ))}
        <button
          type="button"
          className="bg-blue-800 p-2 text-white rounded-md text-sm mt-2"
          onClick={() => handleAddField('workingDays')}
        >
          הוסף יום עבודה
        </button>
      </div>

      <div>
        <label className="block text-gray-800 font-bold mb-2 mt-2">
          תמונות :
        </label>
        {formData.images.map((image, index) => (
          <div key={index}>
            <input
              type="text"
              name="image"
              value={image}
              className="w-full p-2 border-1 border-gray-300 rounded-md"
              onChange={(e) => handleChange(e, index, 'images')}
            />
            <button
              type="button"
              className="bg-red-700 p-2 text-white rounded-md text-sm mt-2"
              onClick={() => handleRemoveField(index, 'images')}
            >
              מחק תמונה
            </button>
          </div>
        ))}
        <button
          type="button"
          className="bg-blue-800 p-2 text-white rounded-md text-sm mt-2"
          onClick={() => handleAddField('images')}
        >
          הוסף תמונה
        </button>
      </div>

      <button
        type="submit"
        className="bg-green-500 p-2 text-white rounded-md text-sm mt-4 w-full"
      >
        עדכן פרטי העסק
      </button>
    </form>
  );
};

export default EditBusinessForm;
