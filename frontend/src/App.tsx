import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logo from "./components/onlyhoops_unofficial_logo.jpg";

function App() {
    return (
        <Router>
            <nav
                style={{
                    padding: "1rem",
                    backgroundColor: "#f2f2f2",
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5rem",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    zIndex: 1000
                }}
            >
                <Link to="/">
                    <img
                        src={Logo}
                        alt="logo"
                        style={{ height: "50px", cursor: "pointer" }}
                    />
                </Link>

                <Link to="/">Home</Link>
                <Link to="/games">Games</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Sign Up</Link>
            </nav>

            <div style={{ paddingTop: "90px" }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/games" element={<Games />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
