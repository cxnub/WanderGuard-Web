import { usePatientContextState } from "pages/home/PatientHook";
import EditMap from "./EditMap.component";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

export default function EditPatient() {
    const { getCurrentPatient, updateSafeZone } = usePatientContextState();
    const patient = getCurrentPatient();
    const navigate = useNavigate();

    const [radius, setRadius] = useState(patient?.safe_zone_radius);
    const [position, setPosition] = useState([patient?.safe_zone_location.lat, patient?.safe_zone_location.lng]);

    const updateMutation = useMutation({
        mutationKey: ['updatePatient'],
        mutationFn: async () => {
            await updateSafeZone(patient.uuid, position[0], position[1], radius);
        },

        onSuccess: () => {
            toast.success("Patient updated successfully.");
            navigate("/dashboard");
        },

        onError: (error) => {
            if (isAxiosError(error) && error.response?.status == 400) {
                return toast.error(error.response?.data.error);
            }

            toast.error("An unexpected error occurred. Please try again.");
        }
    });

    return (
        patient ? <>
            <div className="flex-grow-1 d-flex flex-column">
                <h1 className="fw-semibold fs-4">Edit {patient.first_name} {patient.last_name}&apos;s Safe Zone</h1>
                <EditMap radius={radius} setRadius={setRadius} position={position} setPosition={setPosition} />
            </div>
            <div className="d-flex">
                <button onClick={() => navigate("/dashboard")} className="btn cancel-btn me-2">Cancel</button>
                <button onClick={updateMutation.mutate} className="btn save-changes-btn ms-2">
                    {updateMutation.isPending
                        ? <div className="spinner-border spinner-border-sm" role="status"></div>
                        : "Save Changes"
                    }
                </button>
            </div>
        </> : <Navigate to="/dashboard" />
    )
}