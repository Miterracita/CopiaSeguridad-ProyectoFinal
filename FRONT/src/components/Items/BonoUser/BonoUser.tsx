
import { useState, useEffect } from 'react';
import Logo from '../Logo/Logo';
import './BonoUsers.css';
import { BonoUsersTypes } from './types/index';

const BonoUsers = ({type, reservations}: BonoUsersTypes): JSX.Element => {
  
  const [bonoState, setBonoState] = useState('active');
  const availableClasses = type - reservations;

  useEffect(() => {
    if (reservations === type) {
      setBonoState('inactive');
    } else {
      setBonoState('active');
    }
  }, [reservations, type]);


  return (
    <div className="c-bono">
        <div className='box-bono'>

          <div className='top-flex'>
            <Logo size='small' color='blue' />
            <div className='ico-state'>
              {(bonoState==="active") ? (
                <div className='ico-activo'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#06D001">
                    <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z"/>
                  </svg>
                </div>
              ) : (
                <div className='ico-inactivo'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#A02334">
                    <path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z"/>
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div className='content'>
            <h3>Bono {type} clases.</h3>
            <div>
              <div className='box-clases'>
                <ul>
                  {Array.from({ length: type }, (_, index) => (
                    <li key={index} className={index < reservations ? 'reserved' : 'available'}></li>
                  ))}
                </ul>
              </div>
              <h5>Clases disponibles: {availableClasses}</h5>
            </div>
          </div>

        </div>
    </div>
  )
};

export default BonoUsers;