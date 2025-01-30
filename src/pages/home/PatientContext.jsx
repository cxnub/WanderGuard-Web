import { PatientContext, usePatientContext } from "./PatientHook";

export const PatientContextProvider = ({children}) => {
    const patientContextValue = usePatientContext();
    return <PatientContext.Provider value={patientContextValue}>{children}</PatientContext.Provider>
}

