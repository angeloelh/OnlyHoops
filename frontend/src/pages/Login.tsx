import { useState } from "react";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();

        if (data.token) {
            localStorage.setItem("token", data.token);
            alert("Connexion réussie !");
        } else {
            alert(data.error);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "2rem auto", textAlign: "center" }}>
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required /><br/>
                <input name="password" type="password" placeholder="Mot de passe" onChange={handleChange} required /><br/>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}
