import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBusinesessAction } from '../../../Redux/Actions/BusinessAction';
import { useNavigate } from 'react-router-dom';
import TextInput from '../EditBusiness/TextInput';
import ServiceInputCreate from './ServiceInputCreate';
import WorkingDaysInputsCreate from './WorkingDaysInputsCreate';
import ImagesInputCreate from './ImagesInputCreate';

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

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBusiness((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleServiceChange = useCallback(
    (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setBusiness((prev) => {
        const updatedServices = [...prev.services];
        updatedServices[index][name] = value;
        return { ...prev, services: updatedServices };
      });
    },
    []
  );
  const handleWorkingDayChange = useCallback(
    (
      index: number,
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setBusiness((prev) => {
        const newWorkingDays = [...prev.workingDays];
        newWorkingDays[index][name] = value;
        return { ...prev, workingDays: newWorkingDays };
      });
    },
    []
  );
  const handleImageChange = useCallback(
    (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setBusiness((prev) => {
        const newImages = [...prev.images];
        newImages[index] = value;
        return { ...prev, images: newImages };
      });
    },
    []
  );

  // const handleFileChange = async (index: number, e: any) => {
  //   const file = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append('image', file);

  //   try {
  //     const response = await axios.post(
  //       'http://localhost:8000/api/upload',
  //       formData,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       }
  //     );
  //     console.log('Server response:', response.data);
  //     const data = response.data;
  //     console.log(data);

  //     if (data && data.imageUrl) {
  //       const newImages = [...business.images];
  //       newImages[index] = data.imageUrl; // Update the image URL after upload
  //       setBusiness({ ...business, images: newImages });
  //     } else {
  //       console.error('No imageUrl in response', data);
  //     }
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //   }
  // };

  const addImage = useCallback(() => {
    setBusiness((prev) => ({
      ...prev,
      images: [...prev.images, ''],
    }));
  }, []);

  const addService = useCallback(() => {
    setBusiness((prev) => ({
      ...prev,
      services: [...prev.services, { name: '', price: '', serviceTime: '' }],
    }));
  }, []);

  const removeService = useCallback((index: number) => {
    setBusiness((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  }, []);

  const removeWorkingDay = useCallback((index: number) => {
    setBusiness((prev) => ({
      ...prev,
      workingDays: prev.workingDays.filter((_, i) => i !== index),
    }));
  }, []);

  const removeImage = useCallback((index: number) => {
    setBusiness((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  }, []);

  const addWorkingDay = useCallback(() => {
    setBusiness((prev) => ({
      ...prev,
      workingDays: [
        ...prev.workingDays,
        { day: '', startHour: '', endHour: '' },
      ],
    }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const createdBusiness = dispatch(createBusinesessAction(business));

        if (createdBusiness && createdBusiness._id) {
          navigate(`/business/${createdBusiness._id}`);
        } else {
          console.error('Business creation failed: No ID returned');
        }
      } catch (error) {
        console.log(error);
      }
    },
    [business, dispatch, navigate]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-4 bg-slate-100 shadow-md rounded-lg mt-5"
      dir="rtl"
    >
      <TextInput
        label="שם העסק"
        type="text"
        name="name"
        value={business.name}
        onChange={handleChange}
      />
      <TextInput
        label="עיר"
        type="text"
        name="city"
        value={business.city}
        onChange={handleChange}
      />

      <TextInput
        label="כתובת"
        type="text"
        name="address"
        value={business.address}
        onChange={handleChange}
      />

      <ServiceInputCreate
        services={business.services}
        handleChange={handleServiceChange}
        handleAddField={addService}
        handleRemoveField={removeService}
      />

      <WorkingDaysInputsCreate
        workingDays={business.workingDays}
        handleChange={handleWorkingDayChange}
        handleAddField={addWorkingDay}
        handleRemoveField={removeWorkingDay}
      />

      <ImagesInputCreate
        images={business.images}
        handleChange={handleImageChange}
        handleAddField={addImage}
        handleRemoveField={removeImage}
      />
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
