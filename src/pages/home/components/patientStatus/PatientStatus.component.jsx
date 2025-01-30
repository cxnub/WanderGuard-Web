import StatusCard from "./StatusCard.component";
import PatientLocation from "./PatientLocation.component";
import { usePatientContextState } from "pages/home/PatientHook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function PatientStatus() {
    const { getCurrentPatient, regenCerts } = usePatientContextState();
    const patient = getCurrentPatient();
    const queryClient = useQueryClient();

    const regenCertsMutation = useMutation({
        mutationKey: ['regenCerts'],
        mutationFn: async () => {
            await regenCerts(patient.uuid);
        },

        onSuccess: () => {
            queryClient.invalidateQueries('getPatient');
            toast.success("Device certificates regenerated successfully.");
        },

        onError: (error) => {
            if (isAxiosError(error) && error.response?.status == 400) {
                return toast.error(error.response?.data.error);
            }

            toast.error("An unexpected error occurred. Please try again.");
        }
    });

    return (
        <div className="flex-grow-1 d-flex flex-column">
            {
                patient ? <>
                    <h1 className="fw-semibold fs-4">
                        {patient.first_name} {patient.last_name}{"'s"} Status
                        <span className="float-end fs-6">
                            [ <a className="cert-link" target="_blank" href={patient.presigned_url}>Download Device Certs</a>
                            {"  |  "}
                            <a className="cert-link" target="_blank" onClick={regenCertsMutation.mutate} >{
                                regenCertsMutation.isPending
                                    ? <div className="spinner-border spinner-border-sm" role="status"></div>
                                    : "Regenerate Device Certs"
                            }</a> ]
                        </span>
                    </h1>
                    <StatusCard />
                    <h2 className="fw-semibold fs-5">Last known location</h2>
                    <div className="flex-grow-1 map-container border border-3 border-dark-subtle rounded-3 mb-4">
                        <PatientLocation />
                    </div>
                </> : <div
                    className="d-flex h-100 text-center fs-4 justify-content-center align-items-center"
                >Select a patient to view their status.</div>
            }
        </div>
    )
}