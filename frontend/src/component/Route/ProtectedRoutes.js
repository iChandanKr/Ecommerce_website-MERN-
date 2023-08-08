import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from "react-router-dom"


    const ProtectedRoutes = () => {
        const { loading, isAuthenticated, user } = useSelector((state) => state.user);

        return (
            <Fragment>
                {!loading && (

                    // isAuthenticated ? <Outlet /> : <Navigate to="/login" />
                    isAuthenticated === false ? <Navigate to='/login' /> : <Outlet />
                   
                )

                }

            </Fragment>
        );
    }

export default ProtectedRoutes;