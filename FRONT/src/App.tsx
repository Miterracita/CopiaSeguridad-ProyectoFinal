import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login.js';

import NewBooking from './pages/NewBooking/NewBooking.js';
import NewRegister from './pages/NewRegister/NewRegister.tsx';
import NewBono from './pages/NewBono/NewBono.tsx';
import NewEvent from './pages/NewEvent/NewEvent.tsx';

import UsersList from './pages/UsersList/UsersList.tsx';
import BonoList from './pages/BonoList/BonoList.tsx';
import BookingList from './pages/BookingList/BookingList.tsx';
import EventList from './pages/EventList/EventList.tsx';

import './App.css'


function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/new-booking" element={<NewBooking />} />

      <Route path="/gestion-bonos" element={<BonoList />} />
      <Route path="/gestion-usuarios" element={<UsersList />} />
      <Route path="/gestion-reservas" element={<BookingList />} />
      <Route path="/gestion-eventos" element={<EventList />} />

      <Route path="/new-user" element={<NewRegister />} />
      <Route path="/new-bono" element={<NewBono />} />
      <Route path="/new-event" element={<NewEvent />} />
    </Routes>
  )
}

export default App
