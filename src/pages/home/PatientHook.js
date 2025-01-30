import api from "config/api";
import { useCookies } from "hooks/useStorage";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

export const PatientContext = createContext();

const getPatientsFromLocalStorage = () => {
    const storedPatients = localStorage.getItem('patients');
    if (storedPatients !== null) {
        return JSON.parse(storedPatients);
    }
    return [];
}

const getCurrentPatientUUIDFromLocalStorage = () => {
    return localStorage.getItem('currentPatientUUID') || null;
}

export const usePatientContext = () => {
    const [patients, setPatients] = useState(getPatientsFromLocalStorage());
    const [currentPatientUUID, setCurrentPatientUUID] = useState(getCurrentPatientUUIDFromLocalStorage());
    const [prevLocation, setPrevLocation] = useState({});
    const [token,] = useCookies('token', null);

    const updatePatients = useCallback((newPatients) => {
        setPatients(newPatients);

        if (newPatients && newPatients.length > 0) {
            localStorage.setItem('patients', JSON.stringify(newPatients));
        } else {
            localStorage.removeItem('patients');
            localStorage.removeItem('currentPatientUUID');
        }

    }, []);

    const updateCurrentPatient = (newCurrentPatientUUID) => {
        setCurrentPatientUUID(newCurrentPatientUUID);
        setPrevLocation({});
        localStorage.setItem('currentPatientUUID', newCurrentPatientUUID);
    }

    const getCurrentPatient = () => {
        return patients.find(patient => patient.uuid === currentPatientUUID) || null;
    }

    const fetchPatients = useCallback(async () => {
        if (token) {
            try {
                const response = await api.get('/getPatients');
                updatePatients(response.data.patients);
            } catch {
                console.error("An error occurred while fetching patients.");
            }
        }
    }, [token, updatePatients]);

    const addPatient = useCallback(async (newPatient) => {
        const req = await api.post('/addPatient', newPatient);
        const response = req.data;

        newPatient = response.patient;

        await fetchPatients();
        updateCurrentPatient(newPatient.uuid);

    }, [fetchPatients]);

    const removePatient = useCallback(async () => {
        const patientUUID = currentPatientUUID;
        await api.delete(`/deletePatient/${patientUUID}`);

        await fetchPatients();
        setPrevLocation({});

    }, [currentPatientUUID, fetchPatients]);

    const updateSafeZone = useCallback(async (patientUUID, lat, lng, radius) => {
        await api.put(`/editPatient/${patientUUID}`, { lat, lng, radius });

        await fetchPatients();
    }, [fetchPatients]);

    const regenCerts = useCallback(async (patientUUID) => {
        await api.get(`/regenCredentials/${patientUUID}`);

        await fetchPatients();
    }, [fetchPatients]);

    // fetch patients on mount
    useEffect(() => {
        fetchPatients();
    }, [fetchPatients]);

    // poll the server for updates every 10 seconds
    useEffect(() => {
        const interval = setInterval(fetchPatients, 10000);

        return () => clearInterval(interval);
    }, [fetchPatients, token, updatePatients]);

    return { patients, currentPatientUUID, getCurrentPatient, updatePatients, updateCurrentPatient, addPatient, removePatient, updateSafeZone, regenCerts, prevLocation, setPrevLocation };
};


export const usePatientContextState = () => {
    const {
        patients,
        currentPatientUUID,
        getCurrentPatient,
        updatePatients,
        updateCurrentPatient,
        addPatient,
        removePatient,
        updateSafeZone,
        regenCerts,
        prevLocation,
        setPrevLocation
    } = useContext(PatientContext);

    return {
        patients,
        currentPatientUUID,
        getCurrentPatient,
        updatePatients,
        updateCurrentPatient,
        addPatient,
        removePatient,
        updateSafeZone,
        regenCerts,
        prevLocation,
        setPrevLocation
    };
}
