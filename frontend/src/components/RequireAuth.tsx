import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate, useLocation,Outlet } from 'react-router-dom';

function RequireAuth() {

    const {auth} = useAuth();
    const location = useLocation()

    return (
        /* here we need to check the validity of the token */
        auth?.token ? <Outlet /> : <Navigate to="/user-login" state={{ from: location }} replace />

    )
}

export default RequireAuth