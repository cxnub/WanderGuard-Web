import PropTypes from 'prop-types';

const PATIENT_STATUS = {
    SAFE: "Safe",
    WANDERING: "Wandering",
    OUT_OF_SAFE_ZONE: "Out of safe zone"
};

const patientProp = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    last_updated: PropTypes.string.isRequired,
    heart_rate: PropTypes.number.isRequired,
    travelling_speed: PropTypes.number.isRequired
}).isRequired

export { PATIENT_STATUS, patientProp };