export default function Home() {
  return (
    <main className="flex min-h-screen bg-gray-100 p-4">
      <aside className="w-1/4 bg-white p-4 shadow-lg rounded-lg">
        <section className="mb-4">
          <h2 className="text-xl font-bold mb-2">Reklam</h2>
          <p>Innehåll för Reklam</p>
        </section>
        <section className="mb-4">
          <h2 className="text-xl font-bold mb-2">Karusell med nyheter</h2>
          <p>Innehåll för nyheter</p>
        </section>
        <section className="mb-4">
          <h2 className="text-xl font-bold mb-2">Karusell med sponsorer</h2>
          <p>Innehåll för sponsorer</p>
        </section>
        <section>
          <h2 className="text-xl font-bold mb-2">Karusell med bilder</h2>
          <p>Innehåll för bilder</p>
        </section>
      </aside>
      <div className="w-3/4 bg-white p-8 shadow-lg rounded-lg ml-4">
        <h1 className="text-3xl font-bold mb-4">Välkommen till Arlanda MC</h1>
        <p className="text-lg mb-4">
          Arlanda MC är en klubb för motorcykelentusiaster. Vi erbjuder flera
          banor och aktiviteter för våra medlemmar.
        </p>
        <section className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Baninformation</h2>
          <p className="text-gray-700 leading-relaxed">
            På Arlanda MC finns 3 crossbanor, Stora, Mellan och Lilla. Bredvid
            depån finns tillgång till tvättstation under sommartid.
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Längd Stora MX: 1 740m</li>
            <li>Längd Mellan MX: 1 110m</li>
            <li>Längd Lilla MX: ca 300m</li>
            <li>Underlag: Jord</li>
          </ul>
        </section>
        <section className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Träningstider</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Måndag: 10:00 - 18:00</li>
            <li>Onsdag: 12:00 - 20:00</li>
            <li>Fredag: 14:00 - 19:00</li>
            <li>Lördag: 09:00 - 17:00</li>
            <li>Söndag: 09:00 - 15:00</li>
          </ul>
        </section>
        <section className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Kontakt</h2>
          <p className="text-gray-700 leading-relaxed">
            För mer information, vänligen kontakta oss via e-post på
            info@arlandamc.se eller ring oss på 08-123 456 78.
          </p>
        </section>
      </div>
    </main>
  );
}
