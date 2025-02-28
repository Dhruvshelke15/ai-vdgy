import React from 'react';
import Header from './_components/Header';
import Sidebar from './_components/Sidebar';

function DashLayout({ children }) {
  return (
    <div>
      <div className="hidden md:block h-screen bg-white fixed mt-[65px] w-64">
        <Sidebar />
      </div>
      <div>
        <Header />
        <div className="md:ml-64">{children}</div>
      </div>
    </div>
  );
}

export default DashLayout;
