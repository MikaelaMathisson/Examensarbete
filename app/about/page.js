// app/about/page.js
"use client";

import React from 'react';

const AboutPage = () => {
    return (
        <div className="bg-cover bg-center bg-no-repeat bg-fixed min-h-screen flex justify-center items-center p-5" style={{ backgroundImage: "url('/background1.jpg')" }}>
            <div className="bg-white bg-opacity-90 p-5 rounded-lg shadow-md max-w-3xl">
                <h2 className="text-2xl font-bold mb-4 text-center">Om oss</h2>
                <h3 className="font-bold"> Välkommen till Arlanda MC! </h3>
                <p className="mb-4">
                    Vi är en förening för motocross och enduro entusiaster. Vi har också en RC klubb. Vår klubb erbjuder en rad aktiviteter och evenemang för både nybörjare och erfarna förare.
                </p>
                <p className="mb-4">
                    Vår vision är att skapa en gemenskap där alla kan njuta av sporten och utvecklas som förare. Vi har en passion för motocross och enduro och strävar efter att erbjuda de bästa förutsättningarna för våra medlemmar.
                </p>
                <p className="mb-4">
                    Hos oss hittar du träningsmöjligheter, tävlingar och sociala evenemang. Vi har också en crosskola för de yngre förarna som vill lära sig grunderna och utvecklas inom sporten.
                </p>
                <p className="mb-4">
                    Tveka inte att kontakta oss om du har några frågor eller vill bli medlem.
                </p>
                <p className="mb-4 font-semibold"> Vi ser fram emot att träffa dig på banan!</p>
            </div>
        </div>
    );
};

export default AboutPage;