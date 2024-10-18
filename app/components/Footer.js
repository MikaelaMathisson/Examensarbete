// components/Footer.js
import React from "react";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 relative z-10">
            <div className="container mx-auto px-4 flex flex-wrap justify-between">
                {/* Kontaktsektion */}
                <div className="w-full md:w-1/3 mb-8 text-center md:text-left">
                    <h2 className="text-2xl font-bold mb-4">Kontakt</h2>
                    <p><a href="mailto:info@arlandamc.se" className="hover:text-gray-400">Email: info@arlandamc.se</a></p>
                    <p><a href="tel:0812345678" className="hover:text-gray-400">Telefon: 08-123 456 78</a></p>
                    <p><a href="https://www.google.com/maps/search/?api=1&query=Arlanda+MC,+123+45+Stockholm" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Adress: Arlanda MC, 123 45 Stockholm</a></p>
                    <div className="mt-4">
                        <a href="https://www.facebook.com/arlandamc" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                            <FaFacebook size={24} />
                        </a>
                    </div>
                </div>

                {/* Menysektion */}
                <div className="w-full md:w-1/3 mb-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Meny</h2>
                    <ul className="grid grid-cols-2 gap-2">
                        <li><a href="/about-us" className="hover:text-gray-400">Om oss</a></li>
                        <li><a href="/calendar" className="hover:text-gray-400">Kalender</a></li>
                        <li><a href="/shop" className="hover:text-gray-400">Shop</a></li>
                        <li><a href="https://www.google.com/maps/search/?api=1&query=Arlanda+MC,+123+45+Stockholm" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Hitta till oss</a></li>
                        <li><a href="/contact" className="hover:text-gray-400">Kontakt</a></li>
                        <li><a href="/latestNews" className="hover:text-gray-400">Senaste nytt</a></li>
                        <li><a href="/integritypolicy" className="hover:text-gray-400">Integritetspolicy</a></li>
                    </ul>
                </div>

                {/* Logosektion */}
                <div className="w-full md:w-1/3 mb-8 text-center md:text-right">
                    <Link href="/" className="text-logo whitespace-nowrap">
                        ARLANDA MC
                    </Link>
                    <p>Förening För Motocross Enduro</p>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center mt-8">
                <p>&copy; {new Date().getFullYear()} Arlanda MC. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;