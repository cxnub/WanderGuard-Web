import { usePatientContextState } from "pages/home/PatientHook";
import PatientCard from "./PatientCard.component";

export default function PatientsList() {
    const { patients } = usePatientContextState();
    const hasPatients = patients != undefined && patients.length > 0;

    return (
        <>
            <h1 className="fw-semibold fs-4">Patients Tracker</h1>
            <p>{hasPatients ? "Click on a patient for more information.": "You are currently not tracking any patients, add a new patient to view their status."}</p>
            <div className="patient-list mb-4 px-2">
                {
                    hasPatients && patients.map((patient) => <PatientCard key={patient.uuid} patient={patient} />)
                }
            </div>

        </>
    )
}