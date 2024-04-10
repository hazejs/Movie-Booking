import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Box } from '@mui/material';
import { AppBar, Drawer, DrawerHeader } from '../../styles/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import { clearAuthState } from '../../store/authSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import api from '../../services/axios';
import { APP_NAME } from '../../utils/consts';

interface ComponentProps {
  component: React.ComponentType;
}

const LayoutComponent: React.FC<ComponentProps> = ({
  component: RouteComponent,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = () => {
    dispatch(clearAuthState());
  };

  const loadTokenFromStorage = () => {
    const token = localStorage.getItem('authorization');
    if (token) {
      api.defaults.headers.common['authorization'] = `${token}`;
    }
  };

  React.useEffect(() => {
    loadTokenFromStorage();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position='fixed' open={open}>
        <Toolbar style={{ background: '#000', color: '#fff' }}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            {APP_NAME}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: '#000',
            color: '#fff',
          },
        }}
        variant='permanent'
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon style={{ color: '#fff' }} />
            ) : (
              <ChevronLeftIcon style={{ color: '#fff' }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider style={{ background: '#fff' }} />
        <List>
          <ListItem key={'Movies'} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={() => navigate('/')}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <LocalMoviesIcon style={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary={'Movies'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          {user?.isAdmin && (
            <ListItem key={'Admin'} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={() => navigate('/admin')}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <AdminPanelSettingsIcon style={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText
                  primary={'Admin'}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          )}

          <ListItem key={'Logout'} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={logout}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <LogoutIcon style={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary={'Logout'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1 }}>
        <DrawerHeader />
        <RouteComponent />
      </Box>
    </Box>
  );
};

export default LayoutComponent;
