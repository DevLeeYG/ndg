"use client";
import React, { useState } from "react";

import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const { data: session, status } = useSession();

  return (
    //   navbar goes here
    <nav className="bg-gray-100">
      <div>
        <div>
          {/* secondary nav */}
          {status === "authenticated" ? (
            <div className="hidden md:flex items-center space-x-1">
              <button className="py-5 px-3" onClick={() => signOut()}>
                Log out
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-1">
              <a href="/api/auth/signin" className="py-5 px-3">
                Login
              </a>
              <a
                href="#"
                className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300"
              >
                Signup
              </a>
            </div>
          )}
          {/* mobile menu */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuToggle(!menuToggle)}>
              {menuToggle ? (
                <div className="w-6 h-6" />
              ) : (
                <div className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
