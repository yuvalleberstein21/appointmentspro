const TextInput: React.FC<{
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, name, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-bold mb-2">{label} :</label>
    <input
      type="text"
      name={name}
      value={value}
      className="w-full p-2 border-1 border-gray-300 rounded-md"
      onChange={onChange}
    />
  </div>
);

export default TextInput;
