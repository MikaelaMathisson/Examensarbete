export default function Home() {
  return (
    <main className="flex min-h-screen bg-gray-100 p-4">
      <aside className="w-1/4 bg-white p-4 shadow-lg rounded-lg">
        <section className="mb-4">
          <h2 className="text-xl font-bold mb-2">Reklam</h2>
          <p>Innehåll för reklam</p>
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
        <p className="text-lg">TEXT</p>
      </div>
    </main>
  );
}
