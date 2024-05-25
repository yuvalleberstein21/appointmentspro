import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleBusinesessAction } from '../Redux/Actions/BusinessAction';
import SingleBusinessHeader from '../components/Business/SingleBusiness/SingleBusinessHeader';
import Loading from '../Utils/Loading';

const SingleBusinessPage = () => {
  const getSingleBusiness = useSelector(
    (state: any) => state.getSingleBusiness
  );
  const { loading, error, business } = getSingleBusiness;

  const dispatch = useDispatch<any>();
  const businessId = useParams();

  useEffect(() => {
    try {
      dispatch(getSingleBusinesessAction(businessId.id));
    } catch (error) {
      console.log(error);
    }
  }, [businessId, dispatch]);

  return (
    <div className="flex flex-col md:flex-row gap-4 mx-5">
      {loading ? (
        <Loading />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <SingleBusinessHeader business={business} />
      )}
    </div>
  );
};

export default SingleBusinessPage;
