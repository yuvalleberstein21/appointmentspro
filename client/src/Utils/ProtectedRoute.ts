import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/Actions/AuthAction';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const userLogin = useSelector((state: any) => state.userLogin);

  const { userInfo } = userLogin;

  const navigate = useNavigate();
  if (!userInfo) {
    return navigate('/');
  }

  return children;
};

export default ProtectedRoute;
