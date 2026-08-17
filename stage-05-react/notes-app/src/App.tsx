import Header from "./components/Header";

function App() {
  return (
    <div className="min-h-screen  bg-gray-100">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <h2 className="text-xl font-semibold">My Notes</h2>

        <p className="mt-2  text-gray-600">Your notes will appear here.</p>
      </main>
    </div>
  );
}

export default App;
