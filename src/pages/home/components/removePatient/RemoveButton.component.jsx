import { useMutation } from "@tanstack/react-query";
import { usePatientContextState } from "pages/home/PatientHook";
import { useState } from "react";
import { toast } from "react-toastify";

export default function RemoveButton() {
    const [modalOpen, setModalOpen] = useState(false);
    const { removePatient, getCurrentPatient } = usePatientContextState();
    const patient = getCurrentPatient();

    const removeMutation = useMutation({
        mutationKey: ['removePatient'],
        mutationFn: async () => {
            await removePatient();
        },

        onSuccess: () => {
            // Show success message
            toast.success("Patient removed successfully.");
            setModalOpen(false);
        },

        onError: () => {
            // Show error message
            toast.error("An unexpected error occurred. Please try again.");
        }
    });

    const toggleModal = () => {
        setModalOpen((prev) => !prev);
    }

    return <>
        <button onClick={toggleModal} className="btn remove-btn ms-2">Remove Patient</button>
        {patient && <div className="modal remove-modal" style={{ display: modalOpen ? "block" : "none" }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Remove {patient.first_name} {patient.last_name}?</h5>
                        <button onClick={toggleModal} type="button" className="btn-close" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>This action is irreversible.</p>
                    </div>
                    <div className="modal-footer">
                        <button onClick={toggleModal} type="button" className="btn btn-secondary">Cancel</button>
                        <button onClick={removeMutation.mutate} type="button" className="btn btn-danger">{
                            removeMutation.isPending
                                ? <div className="spinner-border spinner-border-sm" role="status"></div>
                                : "Remove"
                        }</button>
                    </div>
                </div>
            </div>
        </div>}
    </>
}