import { Routes, Route } from 'react-router-dom'
import { useReducer } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Lab01 from './pages/lab01';
import Lab02 from './pages/Lab02';
import Lab3Page from './component/Lab3Page';
import Lab04 from './pages/Lab04';
import NotFound from './pages/NotFound';
import AppContext from './data/AppContext';
import AppReducer from './data/AppReducer';
import { people } from '../module-data';

// Dodajemy dodatkowe właściwości do danych
const data = people.map(person => ({
  ...person,
  rating: 0,
  isChecked: false
}));

function App() {
  const [state, appDispatch] = useReducer(AppReducer, data);

  return (
    <AppContext.Provider value={{ items: state, dispatch: appDispatch }}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="lab01" element={<Lab01 />} />
          <Route path="lab02" element={<Lab02 />} />
          <Route path="lab02/:id" element={<Lab02 />} />
          <Route path="lab3" element={<Lab3Page />} />
          <Route path="lab4" element={<Lab04 />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppContext.Provider>
  )
}

export default App
