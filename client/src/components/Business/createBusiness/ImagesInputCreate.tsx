const ImagesInputCreate: React.FC<{
  images: string[];
  handleChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddField: () => void;
  handleRemoveField: (index: number) => void;
}> = ({ images, handleChange, handleAddField, handleRemoveField }) => (
  <div className="mb-4">
    <label className="block text-gray-800 font-bold mb-2 text-center text-lg">
      תמונות :
    </label>
    {images.map((image, index) => (
      <div key={index} className="mb-2">
        <input
          type="text"
          value={image}
          onChange={(e) => handleChange(index, e)}
          className="w-full p-2 border rounded-md"
        />
        {image && (
          <img src={image} alt={`image-${index}`} height="100" width="100" />
        )}
        <button
          type="button"
          className="bg-gray-500 p-2 text-white rounded-md text-sm mt-2"
          onClick={() => handleRemoveField(index)}
        >
          הסר תמונה
        </button>
      </div>
    ))}
    <button
      type="button"
      className="bg-blue-500 p-2 text-white rounded-md text-sm mt-2"
      onClick={handleAddField}
    >
      הוסף תמונה
    </button>
  </div>
);

export default ImagesInputCreate;
