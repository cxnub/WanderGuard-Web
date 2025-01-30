import { useMutation } from "@tanstack/react-query";
import { useAuth } from "hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { AuthError } from "../AuthProvider";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";

export default function Register() {
    const navigate = useNavigate();
    const { register: authRegister } = useAuth();

    const { register, formState: { errors }, handleSubmit } = useForm({
        criteriaMode: "all"
    });
    const [requestError, setRequestError] = useState(null);

    const registerMutation = useMutation({
        mutationKey: ['register'],
        mutationFn: (data) => {
            setRequestError(null);
            return authRegister(data);
        },

        onError: (error) => {
            if (error instanceof AuthError) {
                setRequestError(error.message);
            } else {
                setRequestError("An unexpected error occurred. Please try again.");
            }
        }
    });

    const onSubmit = data => {
        registerMutation.mutate(data);
    };
    console.log(errors);

    const emailValidator = register("email", {
        required: "Email is required.",
        minLength: {
            value: 5,
            message: "Email should be at least 5 characters."
        },
        maxLength: {
            value: 200,
            message: "Email should not exceed 200 characters."
        }
    });

    const usernameValidator = register("username", {
        required: "Username is required.",
        minLength: {
            value: 5,
            message: "Username should be at least 5 characters."
        },
        maxLength: {
            value: 20,
            message: "Username should not exceed 20 characters."
        }
    });

    const passwordValidator = register("password", {
        required: "Password is required.",
        minLength: {
            value: 8,
            message: "Password should be at least 8 characters."
        },
        maxLength: {
            value: 20,
            message: "Password should not exceed 20 characters."
        }
    });

    return (
        <>
            <h1>Get Started!</h1>
            <form className="w-100 px-5 form-floating" onSubmit={handleSubmit(onSubmit)}>

                <div className="input-group d-flex flex-column pb-2">
                    <label className="error-msg"><ErrorMessage errors={errors} name="email" /></label>
                    <input
                        type="email"
                        className="form-control email-input p-2 w-100"
                        placeholder="Email"
                        aria-label="Email"
                        id="email-input"
                        {...emailValidator}
                    />
                </div>

                <div className="input-group d-flex flex-column pb-2">
                    <label className="error-msg"><ErrorMessage errors={errors} name="username" /></label>
                    <input
                        type="text"
                        className="form-control email-input p-2 w-100"
                        placeholder="Username"
                        aria-label="Username"
                        {...usernameValidator}
                    />
                </div>

                <div className="input-group d-flex flex-column mb-3">
                    <label className="error-msg"><ErrorMessage errors={errors} name="password" /></label>
                    <input
                        type="password"
                        className="form-control password-input p-2 w-100"
                        autoComplete="password"
                        placeholder="Password"
                        aria-label="Password"
                        {...passwordValidator}
                    />

                </div>
                <button
                    type="submit"
                    onSubmit={handleSubmit(onSubmit)}
                    className="btn primary-btn w-100 my-2"
                    disabled={registerMutation.isPending}
                >
                    {registerMutation.isPending ?
                        <span className="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span> :
                        "Sign Up"}
                </button>
                <a onClick={() => navigate('/login')} className="btn secondary-btn w-100 mb-3">Already have an account?</a>
                {requestError && <div className="request-error-msg">{requestError}</div>}
            </form>
        </>

    )
}