import React from "react";
import "../globals.css";

const Crosskola = () => {
  return (
      <main className="pb-20 relative inset-0 flex items-center justify-center min-h-screen bg-other bg-gray-100 p-4">
          <div className=" pb-20 bg-opacity-75 bg-white p-8 shadow-lg rounded-lg text-center mb-20">
                  <h1 className="text-4xl font-extrabold mb-10 text-black drop-shadow-lg">
                      Välkommen till Arlanda MC:s crosskola!
                  </h1>
                  <p className="text-lg mb-4 ">
                      Här lär vi ut grunderna i motocross till både nybörjare och erfarna förare.
                  </p>
                  <h2 className="text-2xl text-black font-bold mb-4">Crosskola 2024 - Barn och Ungdom</h2>
                  <div className="flex">
                      <div className="w-1/2 p-4 bg-gray-200">
                          <h2 className="font-bold mb-4"> Datum för höstens träningar: </h2>
                          <ul className="mb-4">
                              <li> 22/8</li>
                              <li> 29/8</li>
                              <li> 5/9</li>
                              <li> 12/9</li>
                          </ul>
                          <h2 className=" font-bold"> Tid: </h2>
                          <p> 17:45 (färdiga omklädda) – 20:00 </p>

                      </div>
                      <div className="w-1/2 p-4 bg-gray-400">
                          <h2 className="font-bold mb-5"> Grupper för årets crosskola: </h2>
                          <ul>
                              <li className="mb-4"> Nybörjare 50cc-80cc</li>
                              <li className="mb-4"> Fortsättning 50cc-80cc</li>
                              <li> Tävlingsgrupp 65cc-80cc</li>

                          </ul>
                      </div>
                  </div>
                  <p className="mt-4">
                      Vårdnadshavare anmäler barnet i den grupp som ni avser att köra i. </p>
                  <p> Det kommer gå att byta grupp under terminen om man vill det,</p>
                  <p> eller att tränarna vill att barnet byter grupp.</p>
                  <p className="font-semibold mt-4">
                      Det kommer också finnas möjlighet för ditt barn under 12 år att ta en Guldhjälmslicens i
                      crosskolan.
                  </p>
              <h2 id="crosskola-vuxna" className="text-2xl text-black font-bold mb-4 mt-4">Crosskola 2024 - Vuxna</h2>
              <p> Gratis och endast för medlemmar i Arlanda MC. Klubbens serierförare är också välkomna </p>
              <p>Alla med hojar 125cc och uppåt är välkomna. Likaså klubbens serieförare.</p>
              <p className="font-bold mb-4 mt-4"> Tränare: Ola och Ove Lindén</p>
              <div className="flex">
                  <div className="w-1/2 p-4 bg-gray-200">
                      <h2 className="font-bold mb-4"> Datum för höstens träningar: </h2>
                      <ul className="mb-4">
                          <li> 1/09</li>
                          <li> 8/09</li>
                          <li> 15/09</li>
                          <li> 22/09</li>
                          <li> 29/09</li>
                      </ul>
                      <h2 className=" font-bold"> Tid: </h2>
                      <p> 9:00 (färdiga omklädda) – 11:00 </p>

                  </div>
                  <div className="w-1/2 p-4 bg-gray-400">
                      <h2 className="font-bold mb-5"> Grupper för vuxna: </h2>
                      <ul>
                          <li className=" mb-4"> Motionärer</li>
                          <li className="mb-4"> Tävlingsförare & Snabba motionärer</li>

                      </ul>
                  </div>
              </div>
              <p className=" mt-10">
                  Kontakta
                  <a className="font-bold" href="mailto:annika.ekengren@arlandamc.se"> Annika Ekengren</a>
                  vid eventuella frågor.
              </p>
          </div>

      </main>
  );
};

export default Crosskola;