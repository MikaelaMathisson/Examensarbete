"use client";
import React, { useState } from 'react';
import '../globals.css';

const Page = () => {
  const initialFormData = {
    membershipType: '',
    firstName: '',
    lastName: '',
    personalNumber: '',
    email: '',
    phone: '',
    sport: '',
    consent: false,
    verification: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [verificationCode] = useState('43439'); // This should be generated dynamically in a real application

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.consent) {
      alert('Du måste ge ditt medgivande för att skicka ansökan.');
      return;
    }
    if (formData.verification !== verificationCode) {
      alert('Fel verifieringskod.');
      return;
    }
    try {
      const response = await fetch('/api/submitMember', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        resetForm();
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application');
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return (
      <div className="flex justify-center items-center min-h-screen bg-page p-5 font-sans">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
          <h1 className="text-3xl font-bold mb-10 text-center">Bli medlem</h1>
          <div className="flex">
            <div className="w-1/2 pr-8">
              <p className="mb-4 font-bold text-2xl">
                Skicka din ansökan till oss idag och bli medlem i Arlanda MX.
              </p>
              <h2 className="text-2xl font-semibold mb-3 mt-10">Medlemsavgifter</h2>
              <ol>Enskild medlem 1200kr</ol>
              <ol>Familjemedlem 1400kr</ol>
              <ol>Stödmedlem 500kr</ol>
              <p>
                Läs mer om de olika medlemskapen på
                <a href="/members" className="text-blue-600 hover:underline"> Medlemmar</a>
              </p>
              <h2 className="text-2xl font-semibold mb-3 mt-10">Medlemsförmåner</h2>
              <ol className="list-decimal list-inside">
                <ol className="mb-4">Träna till lägre priser!</ol>
                <ol className="mb-4">Möjlighet att tjäna ihop till träningskort så att du får träna gratis på alla AMCs banor (läs mer under Medlemmar)</ol>
                <ol className="mb-4">Köpa snygga klubbprodukter till rabatterat pris</ol>
                <ol className="mb-4">Få 50 % tillbaka på nationella tävlingsavgifter som aktiv medlem och om du kör med AMCs klubbtröja och innehar träningskort för innevarande år.</ol>
                <ol className="mb-4">Delta i det tränarledda klubbträningar gratis</ol>
                <ol className="mb-4">Delta i läger till subventionerade priser</ol>
                <ol className="mb-4">Vara med i årets mest prestigfyllda tävling, KM</ol>
              </ol>
            </div>
            <div className="w-1/2">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="membershipType">
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
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="firstName">
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
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="lastName">
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
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="personalNumber">
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
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
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
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
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
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="sport">
                    Sportgren
                  </label>
                  <select
                      id="sport"
                      name="sport"
                      value={formData.sport}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg"
                      required
                  >
                    <option value="">Välj sportgren</option>
                    <option value="enduro">Enduro</option>
                    <option value="motocross">Motocross</option>
                  </select>
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
                    Jag ger mitt medgivande till att denna hemsida sparar informationen i detta formulär i syfte att kunna kontakta mig.
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="verification">
                    Skriv följande siffror i fältet ({verificationCode})
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
                    className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                >
                  Skicka ansökan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Page;