import { useState } from "react";

export default function Register() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        role: "player",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        alert(data.message || data.error);
    };

    return (
        <div style={{ maxWidth: "400px", margin: "2rem auto", textAlign: "center" }}>
            <h2>Créer un compte</h2>
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder="Nom d'utilisateur" onChange={handleChange} required /><br/>
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required /><br/>
                <input name="password" type="password" placeholder="Mot de passe" onChange={handleChange} required /><br/>
                <select name="role" onChange={handleChange}>
                    <option value="player">Joueur</option>
                    <option value="admin">Admin</option>
                </select><br/>
                <button type="submit">Créer un compte</button>
            </form>
        </div>
    );
}
