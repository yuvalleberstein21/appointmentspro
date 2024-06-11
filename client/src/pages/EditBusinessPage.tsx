import { useDispatch, useSelector } from 'react-redux';
import EditBusinessForm from '../components/Business/EditBusiness/EditBusinessForm';
import { useEffect, useState } from 'react';
import { userBusinesessAction } from '../Redux/Actions/BusinessAction';
import { Business, EditBusinessFormProps } from '../Helpers/BusinessType';
import Loading from '../Utils/Loading';

const EditBusinessPage = () => {
  const userBusiness = useSelector((state: any) => state.userBusiness);
  const { loading, error, business } = userBusiness;

  const dispatch = useDispatch<any>();
  const [selectedBusiness, setSelectedBusiness] =
    useState<EditBusinessFormProps>();

  useEffect(() => {
    try {
      dispatch(userBusinesessAction());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const handleBusinessClick = (business: any) => {
    setSelectedBusiness(business);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="mx-5 py-5">{error} </div>
      ) : (
        <>
          <div dir="rtl" className="w-full py-5 flex justify-center">
            <div className="w-full max-w-3xl">
              <h1 className="text-2xl font-bold text-gray-800 text-center mb-5">
                בחר את העסק שאותו ברצונך לערוך
              </h1>
              {business?.map((b: Business) => (
                <div
                  key={b._id}
                  onClick={() => handleBusinessClick(b)}
                  className="cursor-pointer mb-4 p-5 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105"
                >
                  <div className="card bg-slate-300 p-3 rounded-lg">
                    <div className="name text-lg font-medium text-gray-700">
                      {b.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <EditBusinessForm selectedBusiness={selectedBusiness} />
        </>
      )}
    </div>
  );
};

export default EditBusinessPage;
