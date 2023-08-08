import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from "react-router-dom"


const AdminProtected = () => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);

    return (
        <Fragment>
            {loading === false && (

                // isAuthenticated ? <Outlet /> : <Navigate to="/login" />
                isAuthenticated === false ? <Navigate to='/login' /> : user && (user.role !== "admin" ? <Navigate to='/login' /> : <Outlet />)

            )

            }
            
        </Fragment>
    );
}

export default AdminProtected;