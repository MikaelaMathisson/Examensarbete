"use client";
import React from "react";
import "../globals.css";

const areas = [
    { area: "Ordförande", name: "Fredrik Segerström", phone: "076 798 13 56", email: "fredrik@arlandamc.se" },
    { area: "Vice ordförande", name: "Ove Ekengren", phone: "070 620 99 94", email: "ove@arlandamc.se" },
    { area: "Sekreterare", name: "Annica Ekengren", phone: "070 242 28 40", email: "annica@arlandamc.se" },
    { area: "Kassör", name: "Christina Kanamäki", phone: "", email: "" },
    { area: "Enduro", name: "Oscar Söderman, Camilla Blomberg", phone: "073 514 07 16", email: "enduro@arlandamc.se" },
    { area: "Anläggning, miljö", name: "Johan Karlsson", phone: "", email: "johan@arlandamc.se" },
    { area: "Svemo TA medlemregister", name: "Ken Nylander", phone: "", email: "ken@arlandamc.se" },
    { area: "Hemsida", name: "Mikaela Mathisson", phone: "070 736 97 75", email: "mikaela.mathisson@hotmail.se" },
    { area: "RC", name: "Ken Nylander", phone: "", email: "ken@arlandamc.se" },
];

const Contact = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow flex items-center justify-center bg-page bg-gray-100 bg-opacity-50 p-4">
                <div className="bg-opacity-50 bg-white p-12 shadow-lg rounded-lg text-center transform max-w-2xl w-full">
                    <h1 className="font-bold mb-4 text-black drop-shadow-lg text-4xl">Kontakta oss</h1>
                    <p>Kontakta oss vid frågor så svarar vi så snabbt vi har möjlighet</p>
                    <div className="text-left mb-4 mt-4">
                        <p><strong>Mail:</strong> <a href="mailto:kansli@arlandamc.se" className="text-blue-600 hover:underline">kansli@arlandamc.se</a></p>
                        <p><strong>Adress:</strong> <a href="https://www.google.com/maps/search/?api=1&query=Arlanda+MC,+123+45+Stockholm" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">SVENSBOL 422, 195 92 Märsta (Hitta hit)</a></p>
                        <p><strong>Bankgiro:</strong> 241-4886</p>
                        <p><strong>Swish:</strong> 123 344 21 75</p>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">Område</h2>
                        <table className="w-full text-left">
                            <thead>
                            <tr>
                                <th className="border-b-2 border-black p-2">Område</th>
                                <th className="border-b-2 border-black p-2">Ansvarig</th>
                                <th className="border-b-2 border-black p-2">Telefonnummer</th>
                                <th className="border-b-2 border-black p-2">Mail</th>
                            </tr>
                            </thead>
                            <tbody>
                            {areas.map((area, index) => (
                                <tr key={index}>
                                    <td className="border-b border-black p-2">{area.area}</td>
                                    <td className="border-b border-black p-2">{area.name}</td>
                                    <td className="border-b border-black p-2">
                                        {area.phone && <a href={`tel:${area.phone.replace(/\s+/g, '')}`} className="text-blue-600 hover:underline">{area.phone}</a>}
                                    </td>
                                    <td className="border-b border-black p-2">
                                        {area.email && <a href={`mailto:${area.email}`} className="text-blue-600 hover:underline">{area.email}</a>}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Contact;