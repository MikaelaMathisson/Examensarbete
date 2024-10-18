import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  return (
      <nav className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-30 bg-transparent">
        <div className="flex items-center">
          <Link href="/" className="text-logo whitespace-nowrap">
            ARLANDA MC
          </Link>
        </div>
        <h1 className="text-black font-semibold text-lg tracking-wide">
          <Link href="/latestNews" className="mr-6 hover:text-gray-700">
            Senaste nytt
          </Link>
          <Link href="/mx" className="mr-10 hover:text-gray-700">
            MX
          </Link>
          <Link href="/enduro" className="mr-10 hover:text-gray-700">
            Enduro
          </Link>
          <Link href="/members" className="mr-10 hover:text-gray-700">
            Medlemmar
          </Link>
          <Link href="/member" className="mr-10 hover:text-gray-700">
            Bli medlem
          </Link>
          <Link href="/crosskola" className="mr-10 hover:text-gray-700">
            Crosskola
          </Link>
        </h1>
      </nav>
  );
};

export default Navbar;