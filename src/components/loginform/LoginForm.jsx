
import { useForm } from "react-hook-form";

const LoginForm = ({ onSubmit, loading }) => {
    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm();

    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
                            message: "Minimaal 8 tekens",
                        },
                    })}
                />
                {errors.password && <p className="error">{errors.password.message}</p>}
            </label>

            <button type="submit" disabled={loading}>
                {loading ? "Even geduld..." : "Inloggen"}
            </button>
        </form>
    );
};

export default LoginForm;
