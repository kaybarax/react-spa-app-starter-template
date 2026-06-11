import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { appNavigation, RouterNavigator } from './app-navigation';

/**
 * Custom hook to initialize appNavigation with router props
 * This hook should be used in the main app component or router setup
 */
export const useAppNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Create a RouterNavigator object from the hooks
    const routerNavigator: RouterNavigator = {
      history: {
        goBack: () => navigate(-1),
        push: ({ pathname, search, state }) => navigate(pathname + (search || ''), { state }),
      },
      location: {
        search: location.search,
        state: location.state,
      },
      match: {},
    };

    // Initialize appNavigation with the router props
    appNavigation.initialize(routerNavigator);
  }, [navigate, location]);

  return appNavigation;
};
