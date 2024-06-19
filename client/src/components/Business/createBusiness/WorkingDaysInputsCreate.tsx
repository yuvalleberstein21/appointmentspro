const WorkingDaysInputsCreate: React.FC<{
  workingDays: { day: string; startHour: string; endHour: string }[];
  handleChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddField: () => void;
  handleRemoveField: (index: number) => void;
}> = ({ workingDays, handleChange, handleAddField, handleRemoveField }) => (
  <div className="mb-4">
    <label className="block text-gray-800 font-bold mb-2 text-center text-lg">
      ימי פעילות :
    </label>
    {workingDays.map((day, index) => (
      <div key={index} className="mb-2">
        <select
          className="w-full p-2 border-1 border-gray-300 rounded-md mb-2"
          name="day"
          value={day.day}
          onChange={(e) => handleChange(index, e)}
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
        <label className="block text-gray-700 font-bold mb-2 text-md">
          שעת פתיחה :
        </label>
        <input
          type="time"
          name="startHour"
          placeholder="שעת פתיחה"
          value={day.startHour}
          onChange={(e) => handleChange(index, e)}
          className="w-full p-2 border-1 border-gray-300 rounded-md mb-2"
          required
        />
        <label className="block text-gray-700 font-bold mb-2 text-md">
          שעת סגירה :
        </label>
        <input
          type="time"
          name="endHour"
          placeholder="שעת סגירה"
          value={day.endHour}
          onChange={(e) => handleChange(index, e)}
          className="w-full p-2 border-1 border-gray-300 rounded-md"
          required
        />
        <button
          type="button"
          className="bg-gray-500 p-2 text-white rounded-md text-sm mt-2"
          onClick={() => handleRemoveField(index)}
        >
          הסר יום פעילות
        </button>
      </div>
    ))}
    <button
      type="button"
      className="bg-blue-500 p-2 text-white rounded-md text-sm mt-2"
      onClick={handleAddField}
    >
      הוסף יום פעילות
    </button>
  </div>
);

export default WorkingDaysInputsCreate;
