import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import ForgotPass from './components/ForgotPass';
import Register from './components/Register';
import Error404 from './components/Error404';
import Header from './components/Header';
import Login from './components/Login';
import Home from './components/Home';
import './style/App.css'

function App() {
  const location = useLocation();
  const hideOnRoutes = ['/login', '/register', '/forgotpassword'];

  return (
    <BrowserRouter>
      {!hideOnRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path='/forgotpassword' element={<ForgotPass />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
