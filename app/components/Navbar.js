"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faShoppingCart, faInfoCircle, faMapMarkerAlt, faEnvelope, faChevronDown, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

const Navbar = () => {
    const currentPath = usePathname();
    const router = useRouter();
    const [isMotocrossDropdownOpen, setIsMotocrossDropdownOpen] = useState(false);
    const [isMembersDropdownOpen, setIsMembersDropdownOpen] = useState(false);

    const linkClasses = (path) =>
        `mr-10 hover:text-gray-700 font-bold ${currentPath === path ? 'text-yellow-500' : 'text-white'}`;

    const handleNavigation = (path) => {
        router.push(path);
    };

    const handleMotocrossClick = () => {
        handleNavigation('/mx');
    };

    const handleMotocrossDropdownToggle = (e) => {
        e.stopPropagation();
        setIsMotocrossDropdownOpen(!isMotocrossDropdownOpen);
    };

    const handleMembersClick = () => {
        handleNavigation('/members');
    };

    const handleMembersDropdownToggle = (e) => {
        e.stopPropagation();
        setIsMembersDropdownOpen(!isMembersDropdownOpen);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-30 bg-gray-800">
            <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold text-yellow-500 text-outline">
                    ARLANDA MC
                </Link>
            </div>
            <div className="flex items-center">
                <Link href="/latestNews" className={linkClasses('/latestNews')} title="Senaste nytt">
                    Senaste nytt
                </Link>
                <div className="relative">
                    <button onClick={handleMotocrossClick} className={`${linkClasses('/mx')} flex items-center`} title="MX">
                        Motocross
                        <FontAwesomeIcon icon={faChevronDown} className="ml-2" size="xs" onClick={handleMotocrossDropdownToggle}/>
                    </button>
                    {isMotocrossDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                            <Link href="/mx/baninfo" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                Baninfo
                            </Link>
                            <Link href="/mx/prislista" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                Prislista
                            </Link>
                            <Link href="/mx/faq" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                Vanliga frågor
                            </Link>
                            <Link href="/mx/gobraap" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                GoBraap
                            </Link>
                            <Link href="/mx/licenser" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                Licenser & Försäkringar
                            </Link>
                        </div>
                    )}
                </div>
                <Link href="/enduro" className={`${linkClasses('/enduro')} flex items-center`} title="Enduro">
                    Enduro
                    <FontAwesomeIcon icon={faChevronDown} className="ml-2" size="xs" />
                </Link>
                <div className="relative">
                    <button onClick={handleMembersClick} className={`${linkClasses('/members')} flex items-center`} title="Medlemmar">
                        Medlemmar
                        <FontAwesomeIcon icon={faChevronDown} className="ml-2" size="xs" onClick={handleMembersDropdownToggle}/>
                    </button>
                    {isMembersDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                            <Link href="/members/klubbinfo" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                Klubbinfo
                            </Link>
                            <Link href="/members/medlemsinfo" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                Medlemsinfo
                            </Link>
                            <Link href="/bookingSystem" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                Boka kioskdag
                            </Link>
                            <Link href="/members/instruktioner-kiosken" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                Instruktioner kiosken
                            </Link>
                            <Link href="/members/kiosk-kalender" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                Kiosk kalender & Ersättare
                            </Link>
                            <Link href="/members/utbildning-tavlingsfunktion" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                Utbildning tävlingsfunktion
                            </Link>
                            <Link href="/members/arlanda-rc" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                Arlanda RC
                            </Link>
                        </div>
                    )}
                </div>
                <Link href="/member" className={linkClasses('/member')} title="Bli medlem">
                    Bli medlem
                </Link>
                <Link href="/crosskola" className={`${linkClasses('/crosskola')} flex items-center`} title="Crosskola">
                    Crosskola
                </Link>
                <Link href="/calendar" className={linkClasses('/calendar')} title="Kalender">
                    <FontAwesomeIcon icon={faCalendarAlt} size="lg" />
                </Link>
                <Link href="https://shop.thorsellsreklam.se/klubbsidor/arlanda-mc" className={linkClasses('/webshop')} title="Webshop">
                    <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                </Link>
                <Link href="/about" className={linkClasses('/about')} title="Om oss">
                    <FontAwesomeIcon icon={faInfoCircle} size="lg" />
                </Link>
                <Link href="https://www.google.com/maps/search/?api=1&query=Arlanda+MC,+123+45+Stockholm" className={linkClasses('/findus')} title="Hitta oss" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" />
                </Link>
                <Link href="/contact" className={linkClasses('/contact')} title="Kontakta oss">
                    <FontAwesomeIcon icon={faEnvelope} size="lg" />
                </Link>
                <Link href="https://www.facebook.com/arlandamc" className={linkClasses('/facebook')} title="Facebook" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebook} size="lg" />
                </Link>
                <Link href="/admin" className={linkClasses('/admin')} title="Admin">
                    <FontAwesomeIcon icon={faUserShield} size="lg" />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;