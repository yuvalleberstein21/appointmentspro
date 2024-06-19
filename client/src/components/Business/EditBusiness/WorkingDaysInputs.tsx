import React from 'react';
import TextInput from './TextInput';

const WorkingDaysInputs: React.FC<{
  workingDays: { day: string; startHour: string; endHour: string }[];
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    type: string
  ) => void;
  handleAddField: (type: string) => void;
  handleRemoveField: (index: number, type: string) => void;
}> = ({ workingDays, handleChange, handleAddField, handleRemoveField }) => (
  <div>
    <label className="block text-gray-800 font-bold mb-2 mt-2 text-center text-lg">
      ימי פעילות :
    </label>
    {workingDays.map((day, index) => (
      <div key={index}>
        <select
          className="w-full p-2 border-1 border-gray-300 rounded-md mb-2"
          name="day"
          value={day.day}
          onChange={(e) => handleChange(e, index, 'workingDays')}
          required
        >
          {/* <option value={day.day}>--</option> */}
          <option value="sunday">ראשון</option>
          <option value="monday">שני</option>
          <option value="tuesday">שלישי</option>
          <option value="wednesday">רביעי</option>
          <option value="thursday">חמישי</option>
          <option value="friday">שישי</option>
          <option value="saturday">שבת</option>
        </select>

        <TextInput
          type="time"
          label="תחילת יום עבודה"
          name="startHour"
          value={day.startHour}
          onChange={(e) => handleChange(e, index, 'workingDays')}
        />
        <TextInput
          type="time"
          label="סיום יום עבודה"
          name="endHour"
          value={day.endHour}
          onChange={(e) => handleChange(e, index, 'workingDays')}
        />
        <button
          type="button"
          className="bg-gray-500 p-2 text-white rounded-md text-sm mt-2"
          onClick={() => handleRemoveField(index, 'workingDays')}
        >
          הסר יום עבודה
          <i className="fa-solid fa-trash p-1"></i>
        </button>
      </div>
    ))}
    <button
      type="button"
      className="bg-blue-500 p-2 text-white rounded-md text-sm mt-2"
      onClick={() => handleAddField('workingDays')}
    >
      הוסף יום עבודה
      <i className="fa-solid fa-plus p-1"></i>
    </button>
  </div>
);

export default WorkingDaysInputs;
