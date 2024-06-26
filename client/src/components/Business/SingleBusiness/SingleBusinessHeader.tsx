import { Fragment } from 'react/jsx-runtime';
import { Business } from '../../../Helpers/BusinessType';
import AppointmentList from '../AppointmentList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { userAppointmentAction } from '../../../Redux/Actions/AppointmentAction';

interface BusinessData {
  business: Business;
}

const SingleBusinessHeader: React.FC<BusinessData> = ({ business }) => {
  const userAppointment = useSelector((state: any) => state.userAppointment);
  const { appointment, loading } = userAppointment;

  const dispatch = useDispatch<any>();
  const businessId = useParams();

  useEffect(() => {
    try {
      dispatch(userAppointmentAction(businessId.id));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  return (
    <Fragment>
      <div className="flex flex-col md:flex-row mx-auto md:gap-4">
        <div
          className="md:basis-2/4 p-4 mx-auto text-center"
          key={business?._id}
        >
          <div className="relative flex flex-col text-gray-700 bg-slate-100 shadow-md bg-clip-border rounded-xl w-full">
            <div className="relative mt-4 overflow-hidden text-gray-700 bg-slate-100 shadow-lg bg-clip-border rounded-b-3xl mx-10 h-80">
              <img
                src={business?.images[0]}
                alt={business?.name}
                className="bg-cover bg-center h-full w-full r"
              />
            </div>
            <div className="p-6 text-center" dir="rtl">
              <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-gray-900">
                {business?.name}
              </h4>
              <p className="block font-sans text-base antialiased font-medium leading-relaxed text-gray-500 bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400">
                {business?.city + ',' + business?.address}
              </p>
            </div>
            <div className="flex justify-center p-6 pt-2 gap-7">
              <div className="block font-sans text-xl antialiased font-normal leading-relaxed text-slate-600 rounded-md cursor-pointer hover:bg-lime-100 p-2">
                <i className="fa-brands fa-waze fa-lg"></i>
              </div>
              <div className="block font-sans text-xl antialiased font-normal leading-relaxed text-slate-600 rounded-md cursor-pointer hover:bg-lime-100 p-2">
                <i className="fa-brands fa-instagram fa-lg"></i>
              </div>
              <div className="block font-sans text-xl antialiased font-normal leading-relaxed text-slate-600 rounded-md cursor-pointer hover:bg-lime-100 p-2">
                <i className="fa-brands fa-facebook fa-lg"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Right card */}
        <div
          className="md:basis-2/5 p-4 mx-auto text-center"
          key={`${business?._id}-right`}
        >
          <div className="relative flex flex-col text-gray-700 bg-slate-100 shadow-md bg-clip-border rounded-xl w-full">
            {/* Top three images */}
            <div className="grid grid-cols-3 gap-3 bg-center bg-cover mx-4 mt-4 overflow-hidden rounded-t-xl h-40">
              <img
                src={business?.images[1]}
                alt={business?.name}
                className="h-full w-full object-cover rounded-md"
              />
              <img
                src={business?.images[2]}
                alt={business?.name}
                className="h-full w-full object-cover rounded-md"
              />
              <img
                src={business?.images[3]}
                alt={business?.name}
                className="h-full w-full object-cover rounded-md"
              />
            </div>

            {/* Bottom image */}
            <div className="relative mx-4 gap-3 mt-1 overflow-hidden text-gray-700 bg-slate-100  bg-clip-border rounded-b-xl h-40 mb-3">
              <img
                src={business?.images[4]}
                alt={business?.name}
                className="h-full w-full object-cover rounded-md"
              />
            </div>
          </div>
          <AppointmentList appointments={appointment} loading={loading} />
        </div>
      </div>
    </Fragment>
  );
};

export default SingleBusinessHeader;
