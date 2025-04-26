import React from 'react';
import MenuNav from './MenuNav';
import { Outlet } from 'react-router-dom';

export default function HomeLayout() {
    return (
        <div className='sm:block' style={{ display: "flex", maxWidth: '1440px', margin: 'auto' }}>
            <MenuNav />
            <div className='' style={{ flex: 1, padding: "0" }}>
                <Outlet />
            </div>
        </div>
    );
}
