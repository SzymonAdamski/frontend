import { Routes, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Lab01 from './pages/lab01';
import Lab02 from './pages/Lab02';
import Lab3Page from './component/Lab3Page';
import Lab04 from './pages/Lab04';
import Lab5Page from './pages/Lab5Page';
import UserDetail from './pages/UserDetail';
import PostComments from './pages/PostComments';
import AddForm from './pages/AddForm';
import EditForm from './pages/EditForm';
import NotFound from './pages/NotFound';
import AppProvider from './data/AppProvider';

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="lab01" element={<Lab01 />} />
          <Route path="lab02" element={<Lab02 />} />
          <Route path="lab02/:id" element={<Lab02 />} />
          <Route path="lab3" element={<Lab3Page />} />
          <Route path="lab4" element={<Lab04 />} />
          <Route path="lab4/add" element={<AddForm />} />
          <Route path="lab4/edit" element={<EditForm />} />
          <Route path="lab5" element={<Lab5Page />} />
          <Route path="lab5/users/:id" element={<UserDetail />} />
          <Route path="lab5/posts/:id/comments" element={<PostComments />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppProvider>
  )
}

export default App
