import { useEffect } from 'react';

function Home() {
  useEffect(() => {
    document.title = 'Strona główna - WSEI App';
  }, []);

  return (
    <div className="container py-5">
      <h1 className="text-center">Home</h1>
    </div>
  );
}

export default Home;
