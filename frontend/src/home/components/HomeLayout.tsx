import React from 'react';
import MenuNav from './MenuNav';
import { Outlet } from 'react-router-dom';

export default function HomeLayout() {
    return (
        <div style={{ display: "flex", maxWidth: '1440px', margin: 'auto' }}>
            <MenuNav />
            <div className='m-2' style={{ flex: 1, padding: "0" }}>
                <Outlet />
            </div>
        </div>
    );
}
