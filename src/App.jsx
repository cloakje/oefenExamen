import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importeer de benodigde componenten voor routing
import Home from "./pages/Home"; // Importeer de Home pagina
import CardDetail from "./pages/CardDetail"; // Importeer de CardDetail pagina
import "./App.css"; // Importeer de CSS-bestanden voor stijlen

function App() {
  return (
    <Router>
      {" "}
      {/* Wrapping van de hele applicatie met Router zodat routing mogelijk is */}
      <Routes>
        {" "}
        {/* Begin van de Routes, hiermee definieer je welke pagina's er bestaan */}
        {/* Definieer de route voor de Homepagina, deze is bereikbaar via de root ("/") */}
        <Route path="/" element={<Home />} />{" "}
        {/* De Home component wordt weergegeven wanneer je naar de root navigeert */}
        {/* Definieer de route voor de detailpagina van een specifieke kaart, met een dynamische parameter voor de kaart ID */}
        <Route path="/card/:id" element={<CardDetail />} />{" "}
        {/* De CardDetail component wordt weergegeven wanneer je een kaart-ID hebt, bijv. /card/123 */}
      </Routes>
    </Router> // Sluit de Routes en Router
  );
}

export default App; // Exporteer de App component zodat deze gebruikt kan worden in andere bestanden
