import { useState } from "react";
import "./RecenciesForm.css";

function RecensieForm({ recencies, setRecencies }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecensie = { text: message, author: name, email: email, likes: 0 };
        const updated = [...recencies, newRecensie];
        setRecencies(updated);
        localStorage.setItem("recencies", JSON.stringify(updated));
        setName("");
        setEmail("");
        setMessage("");
    };

    return (
        <div className="recensieForm-outer">
            <section className="recensieForm-inner">
                <form className="recensie-input" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={50}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        maxLength={50}
                    />
                    <textarea
                        placeholder="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        maxLength={200}
                        rows={4}
                    />
                    <div className="recensie-button">
                    <button className="submit-button" type="submit">Submit</button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default RecensieForm;


