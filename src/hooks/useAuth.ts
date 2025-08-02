import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { initializeAuth } from '../utils/initalizeUser';

export const useAuth = () => {
  const { isAuthenticated, isActive, user } = useSelector((state: RootState) => state.auth);
  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      await initializeAuth(dispatch);
      setIsInitialized(true);
    };
    initAuth();
  }, [dispatch]);

  return {
    isAuthenticated,
    isActive,
    user,
    isInitialized,
  };
}; 