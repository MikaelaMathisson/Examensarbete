"use client";
import React, { useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    membershipType: "",
    firstName: "",
    lastName: "",
    personalNumber: "",
    email: "",
    phone: "",
    sport: "",
    consent: false,
    verification: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hantera formulärinlämning här
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-5 font-sans">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-4">Bli medlem</h1>
        <p className="text-lg mb-4">
          Skicka ett meddelande till oss idag med hjälp av formuläret eller
          kontakta oss via informationen nedan. Vi hjälper dig gärna med dina
          frågor. Vi kommer att svara så snart som möjligt.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="membershipType"
            >
              Typ av medlemskap
            </label>
            <select
              id="membershipType"
              name="membershipType"
              value={formData.membershipType}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              <option value="">Typ av medlemskap</option>
              <option value="familjemedlemskap">Familjemedlemskap</option>
              <option value="stödmedlem">Stödmedlem</option>
              <option value="enskild medlem">Enskild medlem</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="firstName"
            >
              Förnamn
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="lastName"
            >
              Efternamn
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="personalNumber"
            >
              Fullständigt personnummer
            </label>
            <input
              type="text"
              id="personalNumber"
              name="personalNumber"
              value={formData.personalNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              E-post
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="phone"
            >
              Telefonnummer
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="sport"
            >
              Sportgren
            </label>
            <input
              type="text"
              id="sport"
              name="sport"
              value={formData.sport}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                className="mr-2 leading-tight"
                required
              />
              Jag ger mitt medgivande till att denna hemsida sparar
              informationen i detta formulär i syfte att kunna kontakta mig.
            </label>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="verification"
            >
              Skriv följande siffror i fältet (43439)
            </label>
            <input
              type="text"
              id="verification"
              name="verification"
              value={formData.verification}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Skicka ansökan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
