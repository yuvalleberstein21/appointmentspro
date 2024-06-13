import { useDispatch, useSelector } from 'react-redux';
import DashboardUi from '../components/AppointmentDashboard/DashboardUi';
import { useEffect, useState } from 'react';
import { dashboardAppointmentAction } from '../Redux/Actions/AppointmentAction';
import { userBusinesessAction } from '../Redux/Actions/BusinessAction';
import { Business } from '../Helpers/BusinessType';
import Loading from '../Utils/Loading';

const AppointmentDashboard = () => {
  const userBusiness = useSelector((state: any) => state.userBusiness);
  const {
    loading: loadingBusiness,
    error: errorBusiness,
    business,
  } = userBusiness;
  const dashboardAppointments = useSelector(
    (state: any) => state.dashboardAppointments
  );
  const { loading, error, appointments } = dashboardAppointments;

  const dispatch = useDispatch<any>();
  useEffect(() => {
    try {
      dispatch(userBusinesessAction());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const handleBusinessAppointments = (businessId: string | undefined) => {
    // setSelectedBusinessId(businessId);
    try {
      dispatch(dashboardAppointmentAction(businessId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full">
        {loadingBusiness ? (
          <Loading />
        ) : errorBusiness ? (
          <div>{error}</div>
        ) : (
          <>
            <h1>בחר את העסק המבוקש</h1>
            {business?.length > 0 &&
              business.map((b: Business) => (
                <div
                  key={b._id}
                  onClick={() => handleBusinessAppointments(b._id)}
                  className="cursor-pointer mb-4 p-5  bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105"
                >
                  <div className="card bg-slate-300  p-3 rounded-lg">
                    <div className="name text-lg font-medium text-gray-700">
                      {b.name}
                    </div>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
      <div className="mx-5 p-3">
        <DashboardUi
          loading={loading}
          error={error}
          appointments={appointments}
        />
      </div>
    </>
  );
};

export default AppointmentDashboard;
