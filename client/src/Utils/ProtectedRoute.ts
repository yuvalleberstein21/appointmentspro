import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
