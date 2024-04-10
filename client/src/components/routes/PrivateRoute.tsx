import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import LayoutComponent from '../core/Layout';

interface Props {
  component: React.ComponentType;
  path?: string;
  isAdmin?: boolean;
}

const PrivateRoute: React.FC<Props> = ({
  component: RouteComponent,
  isAdmin,
}) => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  if (isAdmin) {
    if (user?.isAdmin) return <LayoutComponent component={RouteComponent} />;
    if (!user?.isAdmin) return <Navigate to='/' />;
  }

  if (isAuthenticated) {
    return <LayoutComponent component={RouteComponent} />;
  }

  return <Navigate to='/auth' />;
};

export default PrivateRoute;
