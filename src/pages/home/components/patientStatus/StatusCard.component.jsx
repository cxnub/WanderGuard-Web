import { usePatientContextState } from "pages/home/PatientHook";
import { patientProp } from "utils/constants";
import { getCardColor, parseLastUpdated } from "utils/utils"

export default function StatusCard() {
    const { getCurrentPatient } = usePatientContextState();
    const patient = getCurrentPatient();
    const lastUpdated = parseLastUpdated(patient.last_updated);
    const cardColor = getCardColor(patient.status);

    return (
        <div className="card status-card my-3 p-3 rounded-4 border-0" style={{ backgroundColor: cardColor }}>
            <h5 className="card-title fw-semibold">{patient.first_name} {patient.last_name}</h5>
            <p className="card-text m-0 fw-light"><b className="fw-semibold">Wandering Status: </b>{patient.status ?? "Unknown"}</p>
            <p className="card-text m-0 fw-light"><b className="fw-semibold">Last Updated: </b>{lastUpdated ?? "Unknown"}</p>
            <p className="card-text m-0 fw-light"><b className="fw-semibold">Heart Rate: </b>{patient.heart_rate ?? "Unknown"} bpm</p>
            <p className="card-text m-0 fw-light"><b className="fw-semibold">Travelling Speed: </b>{patient.speed ?? "Unknown"} m/s</p>
        </div>
    )
}

StatusCard.propTypes = {
    patient: patientProp
}
