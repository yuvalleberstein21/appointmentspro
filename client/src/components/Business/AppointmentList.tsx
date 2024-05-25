const AppointmentList = () => {
  return (
    <>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5">
        <div className="p-8 flex">
          <div className="pr-4">
            <p className="text-3xl font-bold text-gray-900">18th</p>
          </div>
          <div>
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Event Name
            </div>
            <p className="mt-2 text-gray-500">Event Description</p>
            <p className="mt-2 text-gray-500">Event Details...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentList;
