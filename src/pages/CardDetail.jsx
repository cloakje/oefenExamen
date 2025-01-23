import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CardDetail() {
  // Haal de 'id' op uit de URL-parameters
  const { id } = useParams();
  const [card, setCard] = useState(null); // State voor het opslaan van de kaartgegevens
  const navigate = useNavigate(); // Functie voor navigatie

  // De URL voor het ophalen van de specifieke kaart
  const URL = `https://api.pokemontcg.io/v2/cards/${id}`;

  // useEffect zorgt ervoor dat we de kaart ophalen zodra de component geladen is
  useEffect(() => {
    const fetchCard = async () => {
      try {
        // Haal de kaartgegevens op van de API
        const response = await fetch(URL, {
          headers: {
            "X-Api-Key": "8e7bf78f-8765-4840-83d2-4dace725a79b", // De API-sleutel voor authenticatie
          },
        });
        // Zet de opgehaalde kaartgegevens in de state
        const data = await response.json();
        setCard(data.data || null); // Als de data niet beschikbaar is, zet null
      } catch (error) {
        // Foutafhandelingsbericht als de API-aanroep mislukt
        console.log("Error fetching card details:", error);
      }
    };
    fetchCard(); // Roep de fetchCard functie aan zodra de component geladen is
  }, [id]); // Als de 'id' verandert, wordt useEffect opnieuw uitgevoerd

  // Als de kaartgegevens nog niet geladen zijn, toon een laadbericht
  if (!card) {
    return <p>Loading card details...</p>;
  }

  return (
    <div className="card-detail">
      {/* Navigatieknop om terug te gaan naar de vorige pagina */}
      <button onClick={() => navigate(-1)}>Terug</button>
      <h1>{card.name}</h1> {/* Toon de naam van de kaart */}
      <div className="card-detail-content">
        <div className="card-image">
          {/* Toon de afbeelding van de kaart */}
          <img src={card.images.large} alt={card.name} />
        </div>

        <div className="card-info">
          {/* Toon de relevante informatie over de kaart */}
          <p>
            <strong>Set:</strong> {card.set.name}
          </p>
          <p>
            <strong>Type:</strong> {card.supertype}
          </p>
          <p>
            <strong>Subtypes:</strong> {card.subtypes?.join(", ") || "N/A"}
          </p>
          <p>
            <strong>Rarity:</strong> {card.rarity || "N/A"}
          </p>
          <p>
            <strong>Artist:</strong> {card.artist || "N/A"}
          </p>
          <p>
            <strong>HP:</strong> {card.hp || "N/A"}
          </p>

          {/* Toon de eigenschappen van de kaart, als die beschikbaar zijn */}
          <p>
            <strong>Abilities:</strong>{" "}
            {card.abilities?.map((ability) => ability.name).join(", ") || "N/A"}
          </p>

          {/* Toon de zwaktes van de kaart, als die beschikbaar zijn */}
          <p>
            <strong>Weaknesses:</strong>{" "}
            {card.weaknesses
              ?.map((weakness) => `${weakness.type} (${weakness.value})`)
              .join(", ") || "N/A"}
          </p>

          {/* Toon de resistenties van de kaart, als die beschikbaar zijn */}
          <p>
            <strong>Resistances:</strong>{" "}
            {card.resistances
              ?.map((resistance) => `${resistance.type} (${resistance.value})`)
              .join(", ") || "N/A"}
          </p>

          {/* Toon de retreat cost van de kaart, als die beschikbaar is */}
          <p>
            <strong>Retreat Cost:</strong>{" "}
            {card.retreatCost?.join(", ") || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardDetail;
