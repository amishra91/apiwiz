import React from 'react';
import Link from 'next/link';

import { menuItems } from '@/constants';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 pb-0 min-h-16">
      <div className="mx-auto flex items-center justify-between">
        <div className="flex gap-11">
          {menuItems.map((item) => (
            <Link
              key={item}
              href="#"
              className={`text-gray-800 navbar-link capitalize ${
                item === 'tasks' ? 'active' : ''
              }`}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
