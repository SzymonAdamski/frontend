import { useState, useEffect } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'
import ProfileGrid from '../component/ProfileGrid';
import 'bootstrap/dist/css/bootstrap.min.css';

function Lab01() {
  useEffect(() => {
    document.title = 'Laboratorium 1 - WSEI App';
  }, []);

  return (
    <div className="App">
      <div className="container-fluid bg-light py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 text-primary font-weight-bold">Lista Profili Użytkowników</h1>
          <p className="lead text-muted">Przegląd wszystkich zarejestrowanych użytkowników</p>
        </div>
        <ProfileGrid columns={3} />
      </div>
    </div>
  )
}

export default Lab01
