"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faShoppingCart, faInfoCircle, faMapMarkerAlt, faEnvelope, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

const Navbar = () => {
    const currentPath = usePathname();
    const router = useRouter();

    const linkClasses = (path) =>
        `mr-10 hover:text-gray-700 font-bold ${currentPath === path ? 'text-yellow-500' : 'text-white'}`;

    const handleMotocrossClick = () => {
        router.push('/mx');
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
                <button onClick={handleMotocrossClick} className={`${linkClasses('/mx')} flex items-center`} title="MX">
                    Motocross
                    <FontAwesomeIcon icon={faChevronDown} className="ml-2" size="xs"/>
                </button>
                <Link href="/enduro" className={`${linkClasses('/enduro')} flex items-center`} title="Enduro">
                    Enduro
                    <FontAwesomeIcon icon={faChevronDown} className="ml-2" size="xs" />
                </Link>
                <Link href="/members" className={`${linkClasses('/members')} flex items-center`} title="Medlemmar">
                    Medlemmar
                    <FontAwesomeIcon icon={faChevronDown} className="ml-2" size="xs" />
                </Link>
                <Link href="/member" className={linkClasses('/member')} title="Bli medlem">
                    Bli medlem
                </Link>
                <Link href="/crosskola" className={`${linkClasses('/crosskola')} flex items-center`} title="Crosskola">
                    Crosskola
                    <FontAwesomeIcon icon={faChevronDown} className="ml-2" size="xs" />
                </Link>
                <Link href="/calendar" className={linkClasses('/calendar')} title="Kalender">
                    <FontAwesomeIcon icon={faCalendarAlt} size="lg" />
                </Link>
                <Link href="https://shop.thorsellsreklam.se/category/arlanda-mc" className={linkClasses('/webshop')} title="Webshop">
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
            </div>
        </nav>
    );
};

export default Navbar;