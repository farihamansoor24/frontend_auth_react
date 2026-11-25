import { createBrowserRouter,createRoutesFromElements, Route,RouterProvider } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Home from "../pages/Home"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import About from "../pages/About";
import Contact from "../pages/Contact";
import ProtectedRoutes from "../components/ProtectedRoutes";
import UserDashboard from "../pages/user/UserDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Profile from "../pages/user/Profile";
import ResetPassword from "../pages/ResetPassword";

    const routes = createRoutesFromElements(
        <>
  {/* Main Layout for user pages */}
    <Route path='/' element={<MainLayout />}>
          <Route index  element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login'  element={<Login />} />
           <Route path='/signup' element={<Signup />} />
         
    </Route>
    {/* Reset Password */}
  <Route path="/reset-password/:token" element={<ResetPassword />} />   
  {/* User Protected Routes */}
<Route element={<ProtectedRoutes role="user" />}>
  <Route path="/user">
    <Route path="user-dashboard" element={<UserDashboard />} />
    <Route path="user-profile" element={<Profile />} />
  </Route>
</Route>

{/* Admin Protected Routes */}
<Route element={<ProtectedRoutes role="admin" />}>
  <Route path="/admin-dashboard" element={<AdminDashboard />} />
</Route>


    {/* If page not found  */}
    <Route path='*' element={<h1>404 Not Found</h1>} />

  </>
  
    )
    const router=createBrowserRouter(routes);


export default router