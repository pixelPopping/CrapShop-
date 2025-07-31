import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
                    roles: ["string"],
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
                <h1>Nieuw bij CrapShop</h1>
                <p>Maak een nieuw account en begin met bestellen</p>
                <p>persoonlijke gegevens</p>
            </header>
            <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
                <label htmlFor="gender-man">
                    Man:
                    <input
                        {...register("gender", { required: "Selecteer een gender" })}
                        type="radio"
                        name="gender"
                        value="man"
                        id="gender-man"
                    />
                </label>
                <label htmlFor="gender-woman">
                    Woman:
                    <input
                        {...register("gender", { required: "Selecteer een gender" })}
                        type="radio"
                        name="gender"
                        value="woman"
                        id="gender-woman"
                    />
                </label>
                <label htmlFor="gender-neutral">
                    Neutral:
                    <input
                        {...register("gender", { required: "Selecteer een gender" })}
                        type="radio"
                        name="gender"
                        value="neutral"
                        id="gender-neutral"
                    />
                </label>
                {errors.gender && <p>{errors.gender.message}</p>}

                <label htmlFor="username-field">
                    Username:
                    <input
                        type="text"
                        id="username-field"
                        {...register("username", {
                            required: "Username is verplicht"
                        })}
                    />
                    {errors.username && <p>{errors.username.message}</p>}
                </label>

                <label htmlFor="lastname-field">
                    Lastname:
                    <input
                        type="text"
                        id="lastname-field"
                        {...register("lastname", {
                            required: "Lastname is verplicht"
                        })}
                    />
                    {errors.lastname && <p>{errors.lastname.message}</p>}
                </label>

                <label htmlFor="postalcode-field">
                    Postal Code:
                    <input
                        type="text"
                        id="postalcode-field"
                        {...register("postalcode", {
                            required: "Postal code is verplicht"
                        })}
                    />
                    {errors.postalcode && <p>{errors.postalcode.message}</p>}
                </label>

                <label htmlFor="unit-field">
                    Unit:
                    <input
                        type="number"
                        id="unit-field"
                        {...register("unit", {
                            required: "Unit is verplicht"
                        })}
                    />
                    {errors.unit && <p>{errors.unit.message}</p>}
                </label>

                <label htmlFor="homeadress-field">
                    Home Adress:
                    <input
                        type="text"
                        id="homeadress-field"
                        {...register("homeadress", {
                            required: "Home adress is verplicht"
                        })}
                    />
                    {errors.homeadress && <p>{errors.homeadress.message}</p>}
                </label>

                <label htmlFor="city-field">
                    City:
                    <input
                        type="text"
                        id="city-field"
                        {...register("city", {
                            required: "City is verplicht"
                        })}
                    />
                    {errors.city && <p>{errors.city.message}</p>}
                </label>

                <label htmlFor="phonenumber-field">
                    Phone number:
                    <input
                        type="tel"
                        id="phonenumber-field"
                        {...register("phonenumber", {
                            required: "Phone number is verplicht"
                        })}
                    />
                    {errors.phonenumber && <p>{errors.phonenumber.message}</p>}
                </label>

                <label htmlFor="date-field">
                    Date of birth:
                    <input
                        type="date"
                        id="date-field"
                        {...register("date", {
                            required: "Date is verplicht"
                        })}
                    />
                    {errors.date && <p>{errors.date.message}</p>}
                </label>

                <h1>Register</h1>

                <label htmlFor="email-field">
                    Email:
                    <input
                        type="email"
                        id="email-field"
                        {...register("email", {
                            required: "Email is verplicht",
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
                                message: "Minimaal 8 tekens"
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


