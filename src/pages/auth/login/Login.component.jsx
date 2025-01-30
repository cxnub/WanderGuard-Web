import { useMutation } from "@tanstack/react-query";
import { useAuth } from "hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { AuthError } from "../AuthProvider";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [requestError, setRequestError] = useState(null);

    const loginMutation = useMutation({
        mutationKey: ['login'],
        mutationFn: (data) => {
            setRequestError(null);
            return login(data);
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
        loginMutation.mutate(data);
    };

    const emailValidator = register("email", {
        required: "Email or username is required.",
        minLength: {
            value: 5,
            message: "Email or username must be at least 5 characters."
        },
        maxLength: {
            value: 200,
            message: "Email or username must not exceed 200 characters."
        }
    });

    const passwordValidator = register("password", {
        required: "Password is required.",
        minLength: {
            value: 8,
            message: "Password must be at least 8 characters."
        },
        maxLength: {
            value: 20,
            message: "Password must not exceed 20 characters"
        }
    });

    return (
        <>
            <h1>Welcome Back!</h1>
            <form className="w-100 px-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group d-flex flex-column pb-2">
                    <label className="error-msg"><ErrorMessage errors={errors} name="email" /></label>
                    <input
                        type="text"
                        className="form-control email-input p-2 w-100"
                        placeholder="Email or username"
                        aria-label="Email"
                        id="email-input"
                        {...emailValidator}
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
                <a className="forgot-password">Forgot Password?</a>
                <button
                    type="submit"
                    className="btn primary-btn w-100 my-3"
                    disabled={loginMutation.isPending}
                >
                    {loginMutation.isPending ?
                        <span className="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span> :
                        "Login"}
                </button>
                <a onClick={() => navigate('/register')} className="btn secondary-btn w-100 mb-3">Create Account</a>
                {requestError && <div className="request-error-msg">{requestError}</div>}
            </form>
        </>

    )
}