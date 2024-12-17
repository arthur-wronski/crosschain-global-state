"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Orbitron } from "next/font/google";
import { Gauge, FileText, CircleUser, LogOut } from "lucide-react"; 

const navLinksLeft = [
  { name: "Dashboard", href: "/dashboard", icon: <Gauge size={18} /> },
  { name: "Docs", href: "/docs", icon: <FileText size={18} /> },
];

const navLinksRight = [
  { name: "Profile", href: "/profile", icon: <CircleUser size={18} /> },
  { name: "Logout", href: "/logout", icon: <LogOut size={18} color='#CD3257' /> },
];

const orbitron = Orbitron({
  subsets: ['latin'],
  display: "swap",
});

const NavBar = () => {
  const [active, setActive] = useState("Home");

  return (
      <div className='sticky top-0 z-50'>
        <div className="flex flex-row justify-between bg-zinc-900 text-white w-full h-16 p-4">
          <div className="flex flex-row space-x-8 my-auto">
              {navLinksLeft.map((link) => (
              <Link 
                  key={link.name}
                  href={link.href}
                  className={`flex items-center space-x-2 ${
                  active === link.name ? "font-bold" : "text-white"
                  } hover:text-zinc-300 transition-colors duration-300`}
                  onClick={() => setActive(link.name)}
              >
                  {link.icon}
                  <span>{link.name}</span>
              </Link>
              ))}
          </div>

          <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
              <h1 className={`text-3xl font-bold ${orbitron.className}`}>ORBITUM</h1>
          </Link>

          <div className="flex flex-row space-x-8 my-auto">
              {navLinksRight.map((link) => (
              <Link 
                  key={link.name}
                  href={link.href}
                  className={`flex items-center space-x-2 ${
                  active === link.name ? "font-bold" : "text-white"
                  } hover:text-zinc-300 transition-colors duration-300`}
                  onClick={() => setActive(link.name)}
              >
                  {link.icon}
                  <span>{link.name}</span>
              </Link>
              ))}
          </div>
        </div>
        <hr className='border-slate-600'/>
      </div>
  );
};

export default NavBar;
