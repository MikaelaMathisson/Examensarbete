import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <h1>
        <Link href="/" className="mr-4">
          Hem
        </Link>
        <Link href="/mx" className="mr-4">
          MX
        </Link>
        <Link href="/enduro" className="mr-4">
          Enduro
        </Link>
        <Link href="/medlemmar" className="mr-4">
          Medlemmar
        </Link>
      </h1>
    </nav>
  );
};

export default Navbar;
