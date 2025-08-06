import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import { AuthContext } from "../../components/context/AuthContext.jsx";
import axios from "axios";
import Navigation from "../../components/navbar/Navigation.jsx";

function SignIn() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm();

    const handleFormSubmit = async (data) => {
        setLoading(true);
        setErrorMessage("");


        try {
            const response = await axios.post(
                `/api/login`,
                {
                    email: data.email,
                    password: data.password,
                },
                {
                    headers: {
                        accept: "application/json",
                        "content-type": "application/json",
                        "novi-education-project-id": "b72992a3-9bd0-4e8c-84d5-0e24aff4e81b",
                    },
                }
            );

            const token = response.data.token;
            console.log("Login succesvol:", response.data);
            localStorage.setItem("token", token);
            login(token);
            navigate("/");
        } catch (error) {
            console.error("Fout bij login:", error.message);
            setErrorMessage("Login mislukt. Controleer je gegevens en probeer opnieuw.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div>
                <button className="btn btn-primary" onClick={() => navigate('/')}>Home</button>
            </div>
            <header>
                <h1>CrapShop</h1>
                <h2>Inloggen</h2>
            </header>
        <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
            <label htmlFor="email-field">
                Email:
                <input
                    type="text"
                    id="email-field"
                    {...register("email", {
                        required: "Email is verplicht",
                        validate: (value) =>
                            value.includes("@") || 'Email moet een "@" bevatten',
                    })}
                />
                {errors.email && <p className="error">{errors.email.message}</p>}
            </label>

            <label htmlFor="password-field">
                Wachtwoord:
                <input
                    type="password"
                    id="password-field"
                    {...register("password", {
                        required: "Wachtwoord is verplicht",
                        minLength: {
                            value: 8,
                            message: "Minimaal 6 tekens",
                        },
                    })}
                />
                {errors.password && <p className="error">{errors.password.message}</p>}
            </label>

            <button type="submit" disabled={loading}>
                {loading ? "Even geduld..." : "Inloggen"}
            </button>

            {errorMessage && <p className="error">{errorMessage}</p>}
        </form>
            </>
    );
}

export default SignIn;



