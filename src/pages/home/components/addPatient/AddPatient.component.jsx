import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditMap from "../editPatient/EditMap.component";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { usePatientContextState } from "pages/home/PatientHook";

export default function AddPatient() {
    const navigate = useNavigate();

    const { register, formState: { errors }, handleSubmit } = useForm();
    const { addPatient } = usePatientContextState();

    const [radius, setRadius] = useState(5);
    const [position, setPosition] = useState([1.3521, 103.8198]);

    const addMutation = useMutation({
        mutationKey: ['addPatient'],
        mutationFn: async (data) => {
            data["safe_zone_location"] = {
                lat: position[0],
                lng: position[1],
            }
            data["safe_zone_radius"] = new Number(radius);

            await addPatient(data);
        },

        onSuccess: () => {
            toast.success("Patient added successfully.");
            navigate("/dashboard");
        },

        onError: (error) => {
            if (isAxiosError(error) && error.response?.status == 400) {
                return toast.error(error.response?.data.error);
            }

            console.error(error);
            toast.error("An unexpected error occurred. Please try again.");
        }
    });

    const firstNameValidator = register("first_name", {
        required: "First Name is required.",
        minLength: {
            value: 2,
            message: "First Name should be at least 2 characters."
        },
        maxLength: {
            value: 30,
            message: "First Name should not exceed 20 characters."
        }
    });

    const lastNameValidator = register("last_name", {
        required: "Last Name is required.",
        minLength: {
            value: 2,
            message: "Last Name should be at least 2 characters."
        },
        maxLength: {
            value: 20,
            message: "Last Name should not exceed 20 characters."
        }
    });

    const emailValidator = register("email", {
        required: "Email is required.",
        minLength: {
            value: 5,
            message: "Email should be at least 5 characters."
        },
        maxLength: {
            value: 200,
            message: "Email should not exceed 200 characters."
        },
        pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
            message: "Invalid email address."
        }
    });

    return (
        <div className="flex-grow-1 d-flex flex-column">
            <h1 className="fw-semibold fs-4">Add New Patient</h1>
            <form className="d-flex flex-column">
                <div className="mb-3 d-flex">
                    <div className="me-2 flex-grow-1">
                        <label htmlFor="name" className="form-label me-2">First Name</label>
                        <label className="error-msg"><ErrorMessage errors={errors} name="first_name" /></label>
                        <input type="text" className="form-control" id="name" {...firstNameValidator} />
                    </div>
                    <div className="ms-2 flex-grow-1">
                        <label htmlFor="name" className="form-label me-2">Last Name</label>
                        <label className="error-msg"><ErrorMessage errors={errors} name="last_name" /></label>
                        <input type="text" className="form-control" id="name" {...lastNameValidator} />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label me-2">Email</label>
                    <label className="error-msg"><ErrorMessage errors={errors} name="email" /></label>
                    <input type="email" className="form-control" id="email" {...emailValidator} />
                </div>
            </form>
            <h2 className="fw-semibold fs-5">Configure Patient Safe Zone</h2>
            <div className="flex-grow-1 d-flex flex-column">
                <EditMap radius={radius} setRadius={setRadius} position={position} setPosition={setPosition} />
            </div>
            <div className="d-flex">
                <button onClick={() => navigate("/dashboard")} className="btn cancel-btn me-2">Cancel</button>
                <button
                    onClick={handleSubmit(data => addMutation.mutate(data))}
                    className="btn save-changes-btn ms-2 d-flex align-items-center justify-content-center"
                    disabled={addMutation.isPending}
                >
                    {addMutation.isPending ? "Adding Patient..." : "Add Patient"}
                    {addMutation.isPending && <div className="ms-3 spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>}
                </button>
            </div>
        </div>
    )
}
