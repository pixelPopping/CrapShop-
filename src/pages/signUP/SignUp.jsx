import { useForm } from "react-hook-form";
import axios from "axios";
import {useNavigate,} from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();


    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm();

    const handleFormSubmit = async (data) => {
        try {
            const response = await axios.post(
                `/api/users`,
                {
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    roles: ["string"]
                },
                {
                    headers: {
                        'accept': 'application/json',
                        'novi-education-project-id': 'b72992a3-9bd0-4e8c-84d5-0e24aff4e81b',
                        'content-type': 'application/json',
                    }
                }
            );

            console.log('Create succesvol:', response.data);
            navigate('/signin');
        } catch (error) {
            console.error('Fout bij create:', error.message);
        }
    };

    return (
        <>
            <div>
           <button className="btn btn-primary" onClick={() => navigate('/')}>Home</button>
            </div>
        <header>
            <h1>Registreren</h1>
        </header>
        <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
            <label htmlFor="username-field">
                Username:
                <input
                    type="text"
                    id="username-field"
                    {...register("username", {
                        required: {
                            value: true,
                            message: "Username is verplicht"
                        }
                    })}
                />
                {errors.username && <p>{errors.username.message}</p>}
            </label>

            <label htmlFor="email-field">
                Email:
                <input
                    type="email"
                    id="email-field"
                    {...register("email", {
                        required: {
                            value: true,
                            message: "Email is verplicht"
                        },
                        validate: value =>
                            value.includes('@') || "Ongeldig e-mailadres"
                    })}
                />
                {errors.email && <p>{errors.email.message}</p>}
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

            <button type="submit">Registreer</button>
        </form>
            </>
    );
}

export default SignUp;
