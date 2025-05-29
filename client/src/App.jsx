import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'


import NotFound from './pages/not-found'

// auth pages
import AuthLayout from './components/auth/Layout'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'

// admin pages
import AdminLayout from './components/admin/Layout'
import AdminDashboard from './pages/admin/Dashboard'
import AdminProducts from './pages/admin/Products'
import AdminOrdersView from './pages/admin/Orders'
import AdminFeatures from './pages/admin/Features';

// shopping pages
import ShoppingLayout from './components/shopping/Layout'
import ShoppingHome from './pages/shopping/Home'
import ShoppingProductListing from './pages/shopping/ProductListing'
import ShoppingCheckout from './pages/shopping/Checkout'
import ShoppingAccount from './pages/shopping/Account'
import CheckAuth from './components/common/CheckAuth'
import UnauthPage from './pages/unauth-page/Index'
import SearchProducts from './pages/shopping/Search';

// reducers
import { setLoading } from './store/auth-slice';

// APIs
import { checkAuth } from './services/operations/authAPI';

// Loader skeleton
import HeaderSkeleton from './components/skeleton/shopping/HeaderSkeleton';

const App = () => {

  const {isAuthenticated, user, isLoading} = useSelector(state => state.auth);

  const dispatch = useDispatch();

  // check if user is authenticated or not on first render
  useEffect(() => {
    const checkAuthentication = async () => {
      dispatch(setLoading(true));
      await checkAuth(dispatch);
      dispatch(setLoading(false));
    }
    checkAuthentication();
  }, [dispatch]);
  

  if(isLoading) {
    return (
      <div className='w-screen'>
        <div className='px-4 md:px-6'>
          <HeaderSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>
        {/* home page */}
        <Route
          path='/'
          element={
            <CheckAuth 
              isAuthenticated={isAuthenticated}
              user={user}>
            </CheckAuth>
          }
        />

        {/* auth routes */}
        <Route path='/auth' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout/>
          </CheckAuth>
        }>
          <Route path='login' element={<Login/>}/>
          <Route path='signup' element={<Signup/>}/>
        </Route>

        {/* admin only routes */}
        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout/>
          </CheckAuth>
        }>
          <Route path='dashboard' element={<AdminDashboard/>}/>
          <Route path='features' element={<AdminFeatures/>}/>
          <Route path='products' element={<AdminProducts/>}/>
          <Route path='orders' element={<AdminOrdersView/>}/>
        </Route>

        {/* shopping routes */}
        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout/>
          </CheckAuth>
          }>
            <Route path='home' element={<ShoppingHome/>}/>
            <Route path='listing' element={<ShoppingProductListing/>}/>
            <Route path='checkout' element={<ShoppingCheckout/>}/>
            <Route path='account' element={<ShoppingAccount/>}/>
            <Route path='search' element={<SearchProducts/>}/>
        </Route>

        {/* unauthorized page */}
        <Route path='/unauth-page' element={<UnauthPage/>}/>

        {/* 404 not found page */}
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      
      
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        theme="light"
      />
    </div>
  )
}

export default App