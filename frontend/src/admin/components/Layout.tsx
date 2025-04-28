import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Layout() {
    const navigate = useNavigate();

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        const user = userStr ? JSON.parse(userStr) : null;

        if (!user || user.role !== "admin") {
            navigate("/", { replace: true });
        }
    }, []);

    return (
        <div
            className='lg:flex max-w-[1440px] mx-auto md:block'
        >
            <Sidebar />
            <div
                className='lg:flex-1 md:flex-0'
            >
                <Outlet />
            </div>
        </div>
    )
}
