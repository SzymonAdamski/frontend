import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProfileGrid from './component/ProfileGrid';
import { people } from '../module-data';

function App() {
  return (
    <div className="App">
      <div className="container-fluid bg-light py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 text-primary font-weight-bold">Lista Profili Użytkowników</h1>
          <p className="lead text-muted">Przegląd wszystkich zarejestrowanych użytkowników</p>
        </div>
        <ProfileGrid people={people} columns={3} />
      </div>
    </div>
  )
}

export default App
