import { useDispatch, useSelector } from 'react-redux';
import EditBusinessForm from '../components/Business/EditBusinessForm';
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
        <div>{error}</div>
      ) : (
        <>
          <div dir="rtl">
            <h1>בחר את העסק שאותו ברצונך לערוך</h1>
            {business?.map((b: Business) => (
              <div key={b._id} onClick={() => handleBusinessClick(b)}>
                <div className="card">
                  <div className="name">{b.name}</div>
                </div>
              </div>
            ))}
          </div>

          <EditBusinessForm selectedBusiness={selectedBusiness} />
        </>
      )}
    </div>
  );
};

export default EditBusinessPage;
