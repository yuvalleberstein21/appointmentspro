const Hours: React.FC<HoursProps> = ({
  selectedService,
  onNextStep,
  onPrevStep,
}) => {
  return (
    <div>
      <h2>Step Two</h2>
      <p>Selected Service: {selectedService ? selectedService.name : 'None'}</p>
      {/* Add step two content and logic here */}
      <div className="flex justify-between mt-8">
        <button
          className="text-md bg-stone-900 text-white rounded-md p-2"
          onClick={onPrevStep}
        >
          חזור
        </button>
        <button
          className="text-md bg-stone-900 text-white rounded-md p-2"
          onClick={onNextStep}
        >
          המשך
        </button>
      </div>
    </div>
  );
};

export default Hours;
