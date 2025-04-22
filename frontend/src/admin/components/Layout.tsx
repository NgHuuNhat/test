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
        <div style={{ display: "flex", maxWidth: '1440px', margin: 'auto' }}>
            <Sidebar />
            <div style={{ flex: 1, padding: "0" }}>
                <Outlet />
            </div>
        </div>
    )
}
