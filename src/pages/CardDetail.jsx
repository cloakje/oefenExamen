import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CardDetail() {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const navigate = useNavigate();
  const URL = `https://api.pokemontcg.io/v2/cards/${id}`;

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await fetch(URL, {
          headers: {
            "X-Api-Key": "8e7bf78f-8765-4840-83d2-4dace725a79b",
          },
        });
        const data = await response.json();
        setCard(data.data || null);
      } catch (error) {
        console.log("Error fetching card details:", error);
      }
    };
    fetchCard();
  }, [id]);

  if (!card) {
    return <p className="loading">Loading card details...</p>;
  }

  return (
    <div className="card-detail">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Terug
      </button>

      <h1 className="card-title">{card.name}</h1>

      <div className="card-detail-container">
        <div className="card-image">
          <img src={card.images.large} alt={card.name} />
        </div>

        <div className="card-info">
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
          <p>
            <strong>Abilities:</strong>{" "}
            {card.abilities?.map((ability) => ability.name).join(", ") || "N/A"}
          </p>
          <p>
            <strong>Weaknesses:</strong>{" "}
            {card.weaknesses
              ?.map((weakness) => `${weakness.type} (${weakness.value})`)
              .join(", ") || "N/A"}
          </p>
          <p>
            <strong>Resistances:</strong>{" "}
            {card.resistances
              ?.map((resistance) => `${resistance.type} (${resistance.value})`)
              .join(", ") || "N/A"}
          </p>
          <p>
            <strong>Retreat Cost:</strong>{" "}
            {card.retreatCost?.join(", ") || "N/A"}
          </p>
          <p>
            <strong>Market Value:</strong>{" "}
            {card.tcgplayer?.prices?.holofoil?.market?.toFixed(2) || "N/A"} USD
          </p>
        </div>
      </div>
      <a
        href={card.tcgplayer?.url || `https://www.tcgplayer.com/`}
        target="_blank"
        rel="noopener noreferrer"
        className="buy-button"
      >
        Koop deze kaart op TCGPlayer
      </a>
    </div>
  );
}

export default CardDetail;
