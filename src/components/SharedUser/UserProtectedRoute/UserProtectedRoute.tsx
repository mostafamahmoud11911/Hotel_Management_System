import React from 'react'
import { Navigate } from 'react-router';
import { Auth, Role } from '../../../constant/enums';

export default function UserProtectedRoute({ children }: { children: React.ReactNode }) {


    const token = localStorage.getItem("authToken");
    const role = JSON.parse(localStorage.getItem("user") as string).role



    if (token) {


        if (role === Role.ADMIN) return <Navigate to={`/${Auth.LOGIN}`} />;

        if (role === Role.USER) return children;


    }
    return <Navigate to={`/${Auth.LOGIN}`} />;
}
