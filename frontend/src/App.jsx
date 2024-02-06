import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import ForgotPass from './components/ForgotPass';
import Register from './components/Register';
import Error404 from './components/Error404';
import Header from './components/Header';
import Login from './components/Login';
import Home from './components/Home';
import Event from './components/Event.jsx';
import './style/App.css'
import Logout from "./components/Logout.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import Checkout from "./components/Checkout.jsx";
import AllEvents from "./components/AllEvents.jsx";
import Success from "./components/Success.jsx";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/adminpanel' element={<AdminPanel />} />
          <Route path='/event/:id' element={<Event />} />
          <Route path='/events' element={<AllEvents />} />
          <Route path='/success' element={<Success />} />
          <Route path='/events/:id' element={<AllEvents />} />
          <Route path='/forgotpassword' element={<ForgotPass />} />,
          <Route path='/register' element={<Register />} />,
          <Route path='/login' element={<Login />} />,
          <Route path='/checkout' element={<Checkout />} />,
        <Route path='*' element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
