import Image from 'next/image';
import React from 'react';

const Sidebar = () => {
  return (
    <aside className="bg-sidebar text-white p-4 max-w-[370px] min-h-screen">
      {/* Sidebar links */}
      <div className="space-y-4">
        <Image src="/assets/logo.png" width={20} height={20} alt="Logo" />
      </div>
    </aside>
  );
};

export default Sidebar;
