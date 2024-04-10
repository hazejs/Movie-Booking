import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/index.scss';
import store, { persistor } from './store/store';
import { Provider } from 'react-redux';
import HomePage from './pages/Home';
import AuthPage from './pages/Auth';
import OrderPage from './pages/Order';
import AdminPage from './pages/Admin';
import PrivateRoute from './components/routes/PrivateRoute';
import { PersistGate } from 'redux-persist/integration/react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path='/auth' element={<AuthPage />} />
            <Route path='/' element={<PrivateRoute component={HomePage} />} />
            <Route
              path='/movie-order'
              element={<PrivateRoute component={OrderPage} />}
            />
            <Route
              path='/admin'
              element={<PrivateRoute isAdmin component={AdminPage} />}
            />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
