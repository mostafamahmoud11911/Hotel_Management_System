import React from 'react'
import { Navigate } from 'react-router';
import { Pages, Paths, Role } from '../../../constant/enums';

export default function AuthRedirect({ children }: { children: React.ReactNode }) {

    const token = localStorage.getItem("authToken");
    const role = JSON.parse(localStorage.getItem("user") as string)?.role





    if (token) {

        if (role === Role.ADMIN) return <Navigate to={Pages.DASHBOARD} />;

        if (role === Role.USER) return <Navigate to={Paths.LANDING} />;
    }

    return children;
}
