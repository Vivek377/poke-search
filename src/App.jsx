import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((res) => {
        const temp = [];
        res.data.results.map(async (ele) => {
          const image = await axios.get(`${ele.url}`);
          const imageUrl = image.data.sprites.front_default;
          temp.push({ image: imageUrl, name: ele.name });
          setData(temp);
        });
      })
      .catch((e) => console.log(e));
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredPokemonList = data.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search)
  );

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 font-sans">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Pokemon Gallery</h1>
          <p className="text-muted-foreground">
            Search and browse through our collection of pokemons.
          </p>
        </div>
        <div className="mb-6">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search images..."
              value={search}
              onChange={handleSearchChange}
              className="pl-10 w-full max-w-md border rounded focus:outline-none py-1"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.length > 0 &&
            filteredPokemonList.map((ele) => {
              return (
                <div
                  key={ele.name}
                  className="bg-background rounded-lg overflow-hidden shadow-md group"
                >
                  <img
                    src={ele.image}
                    alt="Image 1"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1">{ele.name}</h3>
                    {/* <p className="text-muted-foreground text-sm">
                      A peaceful countryside scene.
                    </p> */}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export default App;
