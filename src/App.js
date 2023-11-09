import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Users from './pages/users';
import Company from './pages/company';
import Reserv from './pages/reservation';
import Createcomp from './pages/createcomp';
import Notifs from './pages/notif';
import Travel from './pages/travel';
import Colis from './pages/colis';
import Connect from './pages/conadmin';
import Header from './Components/header';
import Sidebar from './Components/sidebar';
import './Components/styles.css';
import './Components/style2.css';
import Forgot from './pages/Forgot';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Navigate to='conadmin' />} />
        <Route path='conadmin' element={<Connect />} />
        <Route path='forgot' element={<Forgot />} />
        <Route path='home' element={<Home />} />
        <Route path='header' element={<Header />} />
        <Route path='sidebar' element={<Sidebar />} />
        <Route path='users' element={<Users />} />
        <Route path='company' element={<Company />} />
        <Route path='reservation' element={<Reserv />} />
        <Route path='createcomp' element={<Createcomp />} />
        <Route path='notif' element={<Notifs />} />
        <Route path='travel' element={<Travel />} />
        <Route path='colis' element={<Colis />} />
      </Routes>
    </BrowserRouter>
  );
}
