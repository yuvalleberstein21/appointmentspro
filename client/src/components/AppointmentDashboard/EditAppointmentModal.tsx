import { useDispatch } from 'react-redux';
import { AppointmentData } from '../../Helpers/AppointmentType';
import { useEffect, useState } from 'react';
import moment from 'moment';

const EditAppointmentModal = ({ openModal, appointment, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
  });

  useEffect(() => {
    if (appointment) {
      setFormData({
        date: moment(appointment.start).format('YYYY-MM-DD'),
        time: moment(appointment.start).format('HH:mm'),
      });
    }
  }, [appointment]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = moment(`${formData.date} ${formData.time}`).format(
      'YYYY-MM-DDTHH:mm:ss.SSSZ'
    );
    onSave({
      ...appointment,
      start: formattedDate,
      time: formData.time,
    });
  };

  if (!openModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="relative w-full max-w-md p-5 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">ערוך תור</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">תאריך</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">שעה</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              שמור
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAppointmentModal;
