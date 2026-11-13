import SearchBar from "./components/SearchBar";
import InfoCard from "./components/InfoCard";
import MapView from "./components/MapView";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="relative z-10 bg-blue-700 px-6 pt-6 md:pt-8">
        <img
          src="/images/pattern-bg-desktop.png"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />

        <div className="mx-auto max-w-5xl">
          <h1 className="text-center text-2xl font-medium text-white md:text-3xl">
            IP Address Tracker
          </h1>

          <div className="mx-auto mt-6 max-w-xl">
            <SearchBar />
          </div>

          <div className="mt-8 translate-y-1/2">
            <InfoCard />
          </div>
        </div>
      </header>

      <main className="relative isolate min-h-96 flex-1">
        <MapView />
      </main>
    </div>
  );
}

export default App;