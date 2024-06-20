import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getSingleBusinesessAction } from '../Redux/Actions/BusinessAction';
import SingleBusinessHeader from '../components/Business/SingleBusiness/SingleBusinessHeader';
import Loading from '../Utils/Loading';
import Services from '../components/Business/SingleBusiness/Services';
import Hours from '../components/Business/SingleBusiness/Hours';
import Dates from '../components/Business/SingleBusiness/Dates';
import Summary from '../components/Business/SingleBusiness/Summary';
import {
  createAppointmentAction,
  userAppointmentAction,
} from '../Redux/Actions/AppointmentAction';

const SingleBusinessPage = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [step, setStep] = useState(1);

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const getSingleBusiness = useSelector(
    (state: any) => state.getSingleBusiness
  );
  const { loading, error, business } = getSingleBusiness;

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const location = useLocation();
  const businessId = useParams();

  useEffect(() => {
    try {
      dispatch(getSingleBusinesessAction(businessId.id));
    } catch (error) {
      console.log(error);
    }
  }, [businessId, dispatch]);

  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
  };

  const handleDateSelect = (date: any) => {
    setSelectedDate(date);
  };
  const handleHourSelect = (hour: any) => {
    setSelectedHour(hour);
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    if (!userInfo) {
      // Store the intended destination path before redirecting to login
      navigate('/', { state: { from: location.pathname } });
      return;
    }

    try {
      await dispatch(
        createAppointmentAction(
          businessId.id,
          selectedService._id,
          selectedDate,
          selectedHour
        )
      );
      dispatch(userAppointmentAction(businessId.id));
      setStep(1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 mx-5">
        {loading ? (
          <Loading />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <>
            <div className="flex justify-center">
              <SingleBusinessHeader business={business} />
            </div>
            <div className="flex justify-center items-center mt-8">
              {step === 1 && (
                <Services
                  business={business}
                  onServiceSelect={handleServiceSelect}
                  onNextStep={handleNextStep}
                />
              )}
              {step === 2 && (
                <Dates
                  business={business}
                  onDateSelect={handleDateSelect}
                  onNextStep={handleNextStep}
                  onPrevStep={handlePrevStep}
                />
              )}
              {step === 3 && (
                <Hours
                  business={business}
                  selectedService={selectedService}
                  selectedDate={selectedDate}
                  onHourSelect={handleHourSelect}
                  onNextStep={handleNextStep}
                  onPrevStep={handlePrevStep}
                  businessId={businessId.id}
                />
              )}
              {step === 4 && (
                <Summary
                  selectedService={selectedService}
                  selectedDate={selectedDate}
                  selectedHour={selectedHour}
                  business={business}
                  onPrevStep={handlePrevStep}
                  onSubmit={handleSubmit}
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SingleBusinessPage;
