import { useEffect } from 'react';

function NotFound() {
  useEffect(() => {
    document.title = '404 - Nie znaleziono strony';
  }, []);

  return (
    <div className="container py-5">
      <div className="text-center">
        <h1 className="display-4 text-danger">404</h1>
        <p className="lead">Brak strony</p>
      </div>
    </div>
  );
}

export default NotFound;
