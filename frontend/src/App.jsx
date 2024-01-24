import { BrowserRouter, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'
import ForgotPass from './components/ForgotPass';
import Register from './components/Register';
import Error404 from './components/Error404';
import Login from './components/Login';
import Home from './components/Home';
import './style/App.css'

function App() {
  const [count, setCount] = useState(0)

	return (
		<BrowserRouter>
			{/*<Header hamburger={toggleSidebar} />*/}
			<main>
				<Routes>
					<Route path='/forgotpassword' element={<ForgotPass />} />
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />
					<Route path='*' element={<Error404 />} />
					<Route path='/' element={<Home />} />
				</Routes>
			</main>
		</BrowserRouter>
	);
}

export default App
