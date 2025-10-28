import { useEffect } from 'react';
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function Lab04() {
  useEffect(() => {
    document.title = 'Laboratorium 4 - WSEI App';
  }, []);

  return (
    <div>
      <h1>Laboratorium 04</h1>
      <p>cześć cwelu</p>
    </div>
  );
}

export default Lab04;
