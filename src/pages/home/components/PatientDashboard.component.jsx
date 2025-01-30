import { usePatientContextState } from "../PatientHook";
import EditButton from "./editPatient/EditButton.component";
import PatientStatus from "./patientStatus/PatientStatus.component";
import RemoveButton from "./removePatient/RemoveButton.component";

export default function PatientDashboard() {
    const { currentPatientUUID } = usePatientContextState();

    return (
        <>
            <PatientStatus />
            <div className="d-flex">
                {
                    currentPatientUUID &&
                    <>
                        <EditButton />
                        <RemoveButton />
                    </>
                }
            </div>
        </>
    )
}