import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import picture from "../images/pokemon-logo.jpg";

function Home() {
  const [pokemons, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [displayMode, setDisplayMode] = useState("image");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(""); // Nieuw: error state
  const navigate = useNavigate();
  const URL = `https://api.pokemontcg.io/v2/cards`;

  const fetchPokemon = async (query = "", filterBy = "name") => {
    setLoading(true);
    setError(""); // Reset eventuele vorige errors

    const searchField =
      filterBy === "name" ? `name:${query}` : `set.name:"${query}"`;

    try {
      const response = await fetch(`${URL}?q=${searchField}`, {
        headers: {
          "X-Api-Key": "8e7bf78f-8765-4840-83d2-4dace725a79b",
        },
      });

      if (!response.ok) throw new Error("Fout bij ophalen van gegevens"); // API-fout

      const data = await response.json();

      if (!data.data || data.data.length === 0) {
        throw new Error("Geen Pokémon gevonden, probeer een andere zoekterm.");
      }

      setPokemon(data.data);
    } catch (error) {
      setError(error.message); // Zet de foutmelding
      setPokemon([]); // Leeg de lijst als er een fout is
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
    fetchPokemon(searchTerm, searchBy);
  };

  return (
    <div className="App">
      <div className="logo-container">
        <img src={picture} alt="Pokemon Logo" className="pokemon-logo" />
      </div>

      <form onSubmit={handleSearch} className={`search-form ${searched ? "searched" : ""}`}>
        <input
          type="text"
          placeholder={`Zoek op ${searchBy === "name" ? "Pokémon" : "set"}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)} className="search-by-dropdown">
          <option value="name">Zoek op Pokémon</option>
          <option value="set.name">Zoek op Set</option>
        </select>

        <select value={displayMode} onChange={(e) => setDisplayMode(e.target.value)} className="search-by-dropdown">
          <option value="image">Afbeelding</option>
          <option value="list">Lijst</option>
        </select>

        <button type="submit">Zoeken</button>
      </form>

      {loading && <p className="loading">Loading...</p>}

      {error && <p className="error-message">{error}</p>} {/* Toont de error als die er is */}

      {!loading && !error && (
        <div className={displayMode === "image" ? "cards-container" : "list-container"}>
          {pokemons.map((pokemon) =>
            displayMode === "image" ? (
              <div className="card" key={pokemon.id} onClick={() => navigate(`/card/${pokemon.id}`)}>
                <h2>{pokemon.name}</h2>
                <img src={pokemon.images.small} alt={pokemon.name} />
                <p>{pokemon.set.name}</p>
              </div>
            ) : (
              <div className="list-item" key={pokemon.id} onClick={() => navigate(`/card/${pokemon.id}`)}>
                <div className="list-content">
                  <h2>{pokemon.name}</h2>
                  <p><strong>HP:</strong> {pokemon.hp || "Onbekend"}</p>
                  <p><strong>Type(s):</strong> {pokemon.types ? pokemon.types.join(", ") : "Onbekend"}</p>
                  <p><strong>Zeldzaamheid:</strong> {pokemon.rarity || "Onbekend"}</p>
                  <p><strong>Set:</strong> {pokemon.set.name}</p>
                  <p><strong>Uitgever:</strong> {pokemon.set.series}</p>
                  <p><strong>Nummer:</strong> {pokemon.number}</p>
                  <p><strong>Marktprijs:</strong> {pokemon.cardmarket?.prices?.averageSellPrice ? `€${pokemon.cardmarket.prices.averageSellPrice.toFixed(2)}` : "Onbekend"}</p>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
