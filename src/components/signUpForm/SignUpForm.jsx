import React from "react";
import { useForm } from "react-hook-form";
import "./SignUpForm.css";

const SignUpForm = ({ onSubmit, loading, errorMessage }) => {
    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm();

    return (
        <main className="main-outer-form">
            <div className="outer-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-container">
                        <h2>New at CrapShop</h2>
                        <p>Make a new account and start your order !</p>
                        <p>Personal Information</p>
                    </div>
                    <div className="form-input-outer">
                    <section className="inner-form">
                        <div className="gender-group">
                            <label htmlFor="gender-man">
                                Men:
                                <input
                                    {...register("gender", { required: "Selecteer een gender" })}
                                    type="radio"
                                    name="gender"
                                    value="men"
                                    id="gender-men"
                                />
                            </label>

                            <label htmlFor="gender-woman">
                                Female:
                                <input
                                    {...register("gender", { required: "Selecteer een gender" })}
                                    type="radio"
                                    name="gender"
                                    value="woman"
                                    id="gender-woman"
                                />
                            </label>

                            <label htmlFor="gender-neutral">
                                Neutraal:
                                <input
                                    {...register("gender", { required: "Selecteer een gender" })}
                                    type="radio"
                                    name="gender"
                                    value="neutral"
                                    id="gender-neutral"
                                />
                            </label>

                            {errors.gender && <p className="error">{errors.gender.message}</p>}
                        </div>

                        <label htmlFor="username-field">
                            Firstname:
                            <input
                                type="text"
                                id="username-field"
                                {...register("username", { required: "Gebruikersnaam is verplicht" })}
                            />
                            {errors.username && <p className="error">{errors.username.message}</p>}
                        </label>

                        <label htmlFor="lastname-field">
                            Lastname:
                            <input
                                type="text"
                                id="lastname-field"
                                {...register("lastname", { required: "Achternaam is verplicht" })}
                            />
                            {errors.lastname && <p className="error">{errors.lastname.message}</p>}
                        </label>

                        <label htmlFor="postalcode-field">
                            Postalcode:
                            <input
                                type="text"
                                id="postalcode-field"
                                {...register("postalcode", { required: "Postcode is verplicht" })}
                            />
                            {errors.postalcode && <p className="error">{errors.postalcode.message}</p>}
                        </label>

                        <label htmlFor="unit-field">
                            Unit:
                            <input
                                type="number"
                                id="unit-field"
                                {...register("unit", { required: "Huisnummer is verplicht" })}
                            />
                            {errors.unit && <p className="error">{errors.unit.message}</p>}
                        </label>

                        <label htmlFor="homeadress-field">
                            Streetname:
                            <input
                                type="text"
                                id="homeadress-field"
                                {...register("homeadress", { required: "Straatnaam is verplicht" })}
                            />
                            {errors.homeadress && <p className="error">{errors.homeadress.message}</p>}
                        </label>

                        <label htmlFor="city-field">
                            City:
                            <input
                                type="text"
                                id="city-field"
                                {...register("city", { required: "Stad is verplicht" })}
                            />
                            {errors.city && <p className="error">{errors.city.message}</p>}
                        </label>

                        <label htmlFor="phonenumber-field">
                            Phone number:
                            <input
                                type="tel"
                                id="phonenumber-field"
                                {...register("phonenumber", { required: "Telefoonnummer is verplicht" })}
                            />
                            {errors.phonenumber && <p className="error">{errors.phonenumber.message}</p>}
                        </label>

                        <label htmlFor="date-field">
                            Date of Birth:
                            <input
                                type="date"
                                id="date-field"
                                {...register("date", { required: "Geboortedatum is verplicht" })}
                            />
                            {errors.date && <p className="error">{errors.date.message}</p>}
                        </label>

                        <h3>Account Information</h3>

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
                            {errors.email && <p className="error">{errors.email.message}</p>}
                        </label>

                        <label htmlFor="password-field">
                            Password:
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
                        <div className="submit-container">
                        <button className="submit" type="submit" disabled={loading}>
                            {loading ? "Even geduld..." : "Registreer"}
                        </button>
                        </div>

                        {errorMessage && <p className="error">{errorMessage}</p>}
                    </section>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default SignUpForm;


