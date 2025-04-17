import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <div style={{ display: "flex", maxWidth:'1440px', margin: 'auto'}}>
            <Sidebar />
            <div style={{ flex: 1, padding: "0" }}>
                <Outlet />
            </div>
        </div>
    )
}
