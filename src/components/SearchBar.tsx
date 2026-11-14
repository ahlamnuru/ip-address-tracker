import { useState, type FormEvent } from "react";
import { useSearchStore } from "../store/useSerachStore";

// removes spaces, "https://" and anything after the first "/"
function cleanInput(value: string) {
  return value.trim().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
}

function SearchBar() {
  const setQuery = useSearchStore((state) => state.setQuery);
  const [input, setInput] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setQuery(cleanInput(input));
  }

  return (
    <form onSubmit={handleSubmit} className="flex">
      <label htmlFor="search" className="sr-only">
        Search for any IP address or domain
      </label>
      <input
        id="search"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search for any IP address or domain"
        className="h-14 w-full rounded-l-2xl bg-white px-6 text-lg text-zinc-900 placeholder:text-zinc-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      />
      <button
        type="submit"
        aria-label="Search"
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-r-2xl bg-zinc-900 hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <img src="/images/icon-arrow.svg" alt="" />
      </button>
    </form>
  );
}

export default SearchBar;