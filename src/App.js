import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/comman/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import OpenRoute from "./components/core/Auth/OpenRoute";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Settings from "./components/core/Dashboard/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";



function App() {
  return (
    <div  className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path = "/login" element ={<Login/>}/>
        <Route path = "/signup" element ={<Signup/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />}/> 
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />  
        <Route
          path="/about"
          element={
            
              <About />
            
          }
          />

        <Route path="/contact" element={<ContactUs />} />
        
        <Route 
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        >

        <Route path="dashboard/my-profile" element={<MyProfile />} />
        <Route path="dashboard/settings" element={<Settings />} />
        <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
        
        </Route>
      </Routes>
    </div>
  );
}

export default App;
