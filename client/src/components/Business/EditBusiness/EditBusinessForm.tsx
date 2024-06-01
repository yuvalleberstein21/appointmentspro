import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { EditBusinessFormProps } from '../../../Helpers/BusinessType';
import {
  deleteBusinesessAction,
  editBusinesessAction,
  userBusinesessAction,
} from '../../../Redux/Actions/BusinessAction';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import TextInput from './TextInput';
import ServiceInput from './ServiceInput';
import WorkingDaysInputs from './WorkingDaysInputs';

import ImagesInput from './ImagesInput';

const EditBusinessForm: React.FC<EditBusinessFormProps> = ({
  selectedBusiness,
}) => {
  const dispatch = useDispatch<any>();
  const [errorEditBusiness, setErrorEditBusiness] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    city: '',
    address: '',
    services: [{ _id: '', name: '', price: '', serviceTime: '' }],
    workingDays: [{ day: '', startHour: '', endHour: '' }],
    images: [''],
  });

  useEffect(() => {
    if (selectedBusiness) {
      setFormData({
        name: selectedBusiness.name || '',
        city: selectedBusiness.city || '',
        address: selectedBusiness.address || '',
        services:
          selectedBusiness.services?.length > 0
            ? selectedBusiness.services
            : [{ _id: '', name: '', price: '', serviceTime: '' }],
        workingDays:
          selectedBusiness.workingDays?.length > 0
            ? selectedBusiness.workingDays
            : [{ day: '', startHour: '', endHour: '' }],
        images:
          selectedBusiness.images?.length > 0 ? selectedBusiness.images : [''],
      });
    } else {
      setFormData({
        name: '',
        city: '',
        address: '',
        services: [{ _id: '', name: '', price: '', serviceTime: '' }],
        workingDays: [{ day: '', startHour: '', endHour: '' }],
        images: [''],
      });
    }
  }, [selectedBusiness]);

  const handleChange = (e: any, index: number | null, type: string | null) => {
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

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const businessId = selectedBusiness._id;
      try {
        dispatch(editBusinesessAction(businessId, formData));
      } catch (error: any) {
        setErrorEditBusiness(error.message);
      }
    },
    [dispatch, formData, selectedBusiness]
  );

  const handleDeleteBusiness = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const businessId = selectedBusiness._id;

      Swal.fire({
        title: '? אתה בטוח',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '! כן, מחק עסק זה',
      })
        .then((result) => {
          if (result.isConfirmed) {
            dispatch(deleteBusinesessAction(businessId)).then(() => {
              Swal.fire({
                title: '! נמחק',
                text: '!העסק נמחק בהצלחה',
                icon: 'success',
              });

              dispatch(userBusinesessAction());
              setFormData({
                name: '',
                city: '',
                address: '',
                services: [{ _id: '', name: '', price: '', serviceTime: '' }],
                workingDays: [{ day: '', startHour: '', endHour: '' }],
                images: [''],
              });
            });
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
    [dispatch, selectedBusiness]
  );

  return (
    <>
      {selectedBusiness && (
        <form
          className="max-w-xl mx-auto p-4 bg-slate-100 shadow-md rounded-lg mt-5"
          dir="rtl"
        >
          {errorEditBusiness && <div>{errorEditBusiness}</div>}

          <TextInput
            label="שם העסק"
            name="name"
            value={formData.name}
            onChange={(e: Event) => handleChange(e, null, null)}
          />
          <TextInput
            label="עיר"
            name="city"
            value={formData.city}
            onChange={(e: Event) => handleChange(e, null, null)}
          />
          <TextInput
            label="כתובת"
            name="address"
            value={formData.address}
            onChange={(e: Event) => handleChange(e, null, null)}
          />

          <ServiceInput
            services={formData.services}
            handleChange={handleChange}
            handleAddField={handleAddField}
            handleRemoveField={handleRemoveField}
          />

          <WorkingDaysInputs
            workingDays={formData.workingDays}
            handleChange={handleChange}
            handleAddField={handleAddField}
            handleRemoveField={handleRemoveField}
          />

          <ImagesInput
            images={formData.images}
            handleChange={handleChange}
            handleAddField={handleAddField}
            handleRemoveField={handleRemoveField}
          />

          <div className="flex justify-between gap-2">
            <button
              type="button"
              className="bg-red-500 p-2 text-white rounded-md text-sm mt-4 w-full"
              onClick={handleDeleteBusiness}
            >
              מחק עסק זה
            </button>
            <button
              type="submit"
              onSubmit={handleSubmit}
              className="bg-green-500 p-2 text-white rounded-md text-sm mt-4 w-full"
            >
              עדכן פרטי העסק
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default EditBusinessForm;
