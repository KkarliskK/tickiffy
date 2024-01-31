import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import ForgotPass from './components/ForgotPass';
import Register from './components/Register';
import Error404 from './components/Error404';
import Header from './components/Header';
import Login from './components/Login';
import Home from './components/Home';
import './style/App.css'
import Logout from "./components/Logout.jsx";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/forgotpassword' element={<ForgotPass />} />,
          <Route path='/register' element={<Register />} />,
          <Route path='/login' element={<Login />} />,
        <Route path='*' element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
