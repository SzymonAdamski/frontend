import { Outlet } from 'react-router-dom';
import NavBarMenuApp from '../component/NavBarMenuApp';
import FooterApp from '../component/FooterApp';
import AnimatedBackground from '../component/AnimatedBackground';
import CursorCat from '../component/CursorCat';
import ClickEffect from '../component/ClickEffect';

function RootLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* <AnimatedBackground />
      <CursorCat />
      <ClickEffect /> */}
      
      <NavBarMenuApp />
      
      <main className="flex-grow-1">
        <Outlet />
      </main>
      
      <FooterApp />
    </div>
  );
}

export default RootLayout;
