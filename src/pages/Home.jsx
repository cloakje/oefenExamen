import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import picture from "../images/pokemon-logo.jpg"; // Zorg ervoor dat het pad naar het logo klopt

function Home() {
  // States voor het opslaan van de Pokémon gegevens, zoektermen, etc.
  const [pokemons, setPokemon] = useState([]); // De lijst van opgehaalde Pokémon kaarten
  const [searchTerm, setSearchTerm] = useState(""); // De zoekterm die de gebruiker invoert
  const [searchBy, setSearchBy] = useState("name"); // De filteroptie: 'name' voor Pokémon naam of 'set.name' voor setnaam
  const [loading, setLoading] = useState(false); // Laadindicator om te tonen wanneer gegevens opgehaald worden
  const [searched, setSearched] = useState(false); // Deze wordt gebruikt om de zoekstatus bij te houden (om de stijl van de zoekbalk aan te passen)
  const navigate = useNavigate(); // Functie voor navigatie naar detailpagina's

  // URL van de API waar de gegevens opgehaald worden
  const URL = `https://api.pokemontcg.io/v2/cards`;

  // Functie om de Pokémon kaarten op te halen, afhankelijk van de zoekterm en zoekfilter
  const fetchPokemon = async (query = "", filterBy = "name") => {
    setLoading(true); // Zet de loading-status op true om de laadindicator weer te geven

    // Bouw de query afhankelijk van de zoekfilter (naam of setnaam)
    const searchField =
      filterBy === "name" ? `name:${query}` : `set.name:"${query}"`;

    try {
      // Fetch verzoek naar de API om kaarten op te halen
      const response = await fetch(`${URL}?q=${searchField}`, {
        headers: {
          "X-Api-Key": "8e7bf78f-8765-4840-83d2-4dace725a79b", // API-sleutel voor authenticatie
        },
      });
      // Zet de opgehaalde data in de state, zorg ervoor dat de data altijd een array is
      const data = await response.json();
      setPokemon(data.data || []); // Zet de kaarten in de state of een lege array als er geen data is
    } catch (error) {
      // Foutafhandeling in geval van netwerk- of API-problemen
      console.log("Error fetching data:", error);
    }
    setLoading(false); // Zet de loading-status op false als de gegevens zijn opgehaald
  };

  // Ophalen van de kaarten bij het laden van de app (bijvoorbeeld de eerste keer)
  useEffect(() => {
    fetchPokemon(); // Haal de gegevens op zonder een specifieke zoekterm
  }, []); // Deze useEffect wordt slechts één keer uitgevoerd bij het eerste renderen

  // Functie om de zoekopdracht te verwerken
  const handleSearch = (e) => {
    e.preventDefault(); // Voorkom dat de pagina opnieuw laadt
    setSearched(true); // Zet de 'searched' state om de zoekstijl te wijzigen
    fetchPokemon(searchTerm, searchBy); // Haal kaarten op met de opgegeven zoekterm en filter
  };

  return (
    <div className="App">
      {/* Afbeelding van het Pokémon-logo bovenaan de pagina */}
      <div className="logo-container">
        <img src={picture} alt="Pokemon Logo" className="pokemon-logo" />
      </div>

      {/* Zoekformulier */}
      <form
        onSubmit={handleSearch} // Verwerk de zoekactie bij het indienen van het formulier
        className={`search-form ${searched ? "searched" : ""}`} // Voeg de 'searched' klasse toe als er gezocht is
      >
        {/* Zoekinvoerveld, de placeholder past zich aan afhankelijk van de zoekoptie */}
        <input
          type="text"
          placeholder={`Zoek op ${searchBy === "name" ? "Pokémon" : "set"}`} // Dynamische placeholder op basis van de zoekoptie
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Werk de zoekterm bij bij iedere invoer
        />

        {/* Dropdown-menu om te kiezen of er op naam of set wordt gezocht */}
        <select
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)} // Wijzig de zoekoptie afhankelijk van de selectie
          className="search-by-dropdown"
        >
          <option value="name">Zoek op Pokémon</option>
          <option value="set.name">Zoek op Set</option>
        </select>

        {/* Zoekknop */}
        <button type="submit">Zoeken</button>
      </form>

      {/* Laadindicator wordt weergegeven als de data nog niet geladen is */}
      {loading && <p>Loading...</p>}

      {/* De lijst van Pokémon kaarten wordt hieronder weergegeven */}
      <div className="cards-container">
        {/* Map door de opgehaalde kaarten en toon ze in een lijst */}
        {pokemons.map((pokemon) => (
          <div
            className="card"
            key={pokemon.id} // Zorg ervoor dat elke kaart een unieke sleutel heeft
            onClick={() => navigate(`/card/${pokemon.id}`)} // Navigeer naar de detailpagina van de kaart bij een klik
          >
            <h2>{pokemon.name}</h2> {/* Toon de naam van de Pokémon */}
            <img src={pokemon.images.small} alt={pokemon.name} />{" "}
            {/* Toon de afbeelding van de Pokémon */}
            <p>{pokemon.set.name}</p>{" "}
            {/* Toon de naam van de set waartoe de kaart behoort */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
