const ImagesInput: React.FC<{
  images: string[];
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    type: string
  ) => void;
  handleAddField: (type: string) => void;
  handleRemoveField: (index: number, type: string) => void;
}> = ({ images, handleChange, handleAddField, handleRemoveField }) => (
  <div>
    <label className="block text-gray-800 font-bold mb-2 mt-2">תמונות :</label>
    {images.map((image, index) => (
      <div key={index}>
        <input
          type="text"
          name="image"
          value={image}
          className="w-full p-2 border-1 border-gray-300 rounded-md"
          onChange={(e) => handleChange(e, index, 'images')}
        />
        <img
          src={image}
          alt="Business"
          width="100"
          height="100"
          className="rounded-lg mt-2"
        />
        <button
          type="button"
          className="bg-gray-500 p-2 text-white rounded-md text-sm mt-2"
          onClick={() => handleRemoveField(index, 'images')}
        >
          הסר תמונה
          <i className="fa-solid fa-trash p-1"></i>
        </button>
      </div>
    ))}
    <button
      type="button"
      className="bg-blue-500 p-2 text-white rounded-md text-sm mt-2"
      onClick={() => handleAddField('images')}
    >
      הוסף תמונה
      <i className="fa-solid fa-plus p-1"></i>
    </button>
  </div>
);

export default ImagesInput;
