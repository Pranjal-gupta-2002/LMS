import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Layout/Header/Header';
import Courses from './components/Courses/Courses';
import Footer from './components/Layout/Footer/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgetPassword from './components/Auth/ForgetPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Contact from './components/Contact/Contact';
import Request from './components/Request/Request';
import About from './components/About/About';
import Subscribe from './components/Payments/Subscribe';
import NotFound from './components/Layout/NotFound/NotFound';
import PaymentSuccess from './components/Payments/PaymentSuccess';
import PaymentFail from './components/Payments/PaymentFail';
import CoursePage from './components/CoursePage/CoursePage';
import Profile from './components/Profile/Profile';
import ChangePassword from './components/Profile/ChangePassword';
import UpdateProfile from './components/Profile/UpdateProfile';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import CreateCourses from './components/Admin/CreateCourse/CreateCourses';
import AdminCourses from './components/Admin/AdminCourses/AdminCourses';
import Users from './components/Admin/Users/Users';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getMyProfile } from './redux/actions/user';
import Loader from './components/Layout/Loader/Loader';

// import { ProtectedRoute } from 'protected-route-react';
function App() {
  // toast.success("hello")
  const { isAuthenticated, user, message, error, loading } = useSelector(
    state => state.user
  );
  const dispatch = useDispatch();
  // console.log(message);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [error, message, dispatch]);
  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);
  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Toaster />
          <Header isAuthenicated={isAuthenticated} user={user} />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/courses" element={<Courses />} />
            <Route
              path="/register"
              element={
                !isAuthenticated ? (
                  <Register />
                ) : (
                  <Navigate to="/profile" replace />
                )
              }
            />
            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <Login />
                ) : (
                  <Navigate to="/profile" replace />
                )
              }
            />

            <Route path="/request" element={<Request />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />

            <Route
              path="/profile"
              element={
                isAuthenticated ? (
                  <Profile user={user} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/changepassword"
              element={
                isAuthenticated ? (
                  <ChangePassword />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/updateprofile"
              element={
                isAuthenticated ? (
                  <UpdateProfile user={user} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/forgetpassword"
              element={
                !isAuthenticated ? (
                  <ForgetPassword />
                ) : (
                  <Navigate to="/profile" replace />
                )
              }
            />
            <Route
              path="/resetpassword/:token"
              element={
                !isAuthenticated ? (
                  <ResetPassword />
                ) : (
                  <Navigate to="/profile" replace />
                )
              }
            />

            <Route
              path="/subscribe"
              element={
                isAuthenticated ? (
                  <Subscribe user={user} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="*" element={<NotFound />} />
            <Route path="/paymentsuccess" element={<PaymentSuccess />} />
            <Route path="/paymentfail" element={<PaymentFail />} />
            <Route
              path="/course/:id"
              element={
                isAuthenticated ? (
                  <CoursePage user={user}/>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                isAuthenticated && user.role === 'admin' ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/profile" replace />
                )
              }
            />
            <Route
              path="/admin/createcourse"
              element={
                isAuthenticated && user.role === 'admin' ? (
                  <CreateCourses />
                ) : (
                  <Navigate to="/profile" replace />
                )
              }
            />
            <Route
              path="/admin/admincourses"
              element={
                isAuthenticated && user.role === 'admin' ? (
                  <AdminCourses />
                ) : (
                  <Navigate to="/profile" replace />
                )
              }
            />
            <Route
              path="/admin/users"
              element={
                isAuthenticated && user.role === 'admin' ? (
                  <Users />
                ) : (
                  <Navigate to="/profile" replace />
                )
              }
            />
          </Routes>
          <Footer />
        </>
      )}
    </Router>
  );
}

export default App;
