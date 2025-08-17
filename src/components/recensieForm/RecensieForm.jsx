import { useState } from "react";

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
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
    );
}

export default RecensieForm;

