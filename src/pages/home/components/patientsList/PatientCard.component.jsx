import { patientProp } from 'utils/constants';
import { getCardColor, parseLastUpdated } from 'utils/utils';
import { useNavigate } from 'react-router-dom';
import { usePatientContextState } from 'pages/home/PatientHook';

export default function PatientCard({ patient }) {
    const { updateCurrentPatient } = usePatientContextState();
    const lastUpdated = parseLastUpdated(patient.last_updated);
    const cardColor = getCardColor(patient.status);
    const navigate = useNavigate();

    const onCardClick = () => {
        navigate('/dashboard');
        updateCurrentPatient(patient.uuid);
    }

    return (
        <div onClick={onCardClick} className="card patient-card my-3 p-3 rounded-4 border-0" style={{ backgroundColor: cardColor }}>
            <h5 className="card-title fw-semibold">{patient.first_name} {patient.last_name}</h5>
            <p className="card-text m-0 fw-light"><b className="fw-semibold">Wandering Status: </b>{patient.status ?? "Unknown"}</p>
            <p className="card-text m-0 fw-light"><b className="fw-semibold">Last Updated: </b>{lastUpdated ?? "Unknown"}</p>
        </div>
    )
}

PatientCard.propTypes = {
    patient: patientProp
}