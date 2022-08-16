import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from "./pages/ProtectedRoute";
import { Error, Landing, Register } from './pages';
import { AllJobs, AddJob, Profile, SharedLayout, Stats } from "./pages/dashboard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <>
          <ToastContainer />
          <BrowserRouter>
              <Routes>
                  <Route path='/' element={
                      <ProtectedRoute>
                        <SharedLayout />
                      </ProtectedRoute>
                  }>
                      <Route index element={<Stats />} />
                      <Route path='all-jobs' element={<AllJobs />} />
                      <Route path='add-job' element={<AddJob />} />
                      <Route path='profile' element={<Profile />} />
                  </Route>
                  <Route path='landing' element={<Landing />} />
                  <Route path='register' element={<Register />} />
                  <Route path='*' element={<Error />} />
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;
