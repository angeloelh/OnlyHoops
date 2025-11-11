import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Games from "./pages/Games";

function App() {
    return (
        <Router>
            <nav style={{ padding: "1rem", backgroundColor: "#f2f2f2" }}>
                <Link to="/" style={{ marginRight: "1rem" }}>Accueil</Link>
                <Link to="/games"  style={{ marginRight: "1rem" }} >Matchs</Link>

            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/games" element={<Games />} />
            </Routes>
        </Router>
    );
}

export default App;
