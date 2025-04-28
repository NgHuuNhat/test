import React from 'react';
import MenuNav from './MenuNav';
import { Outlet } from 'react-router-dom';

export default function HomeLayout() {
    return (
        <div
            className='lg:flex max-w-[1440px] mx-auto md:block'
        >
            <MenuNav />
            <div
                className='lg:flex-1 md:flex-0'
            >
                <Outlet />
            </div>
        </div>
    );
}
