import { Outlet, useNavigate } from "react-router-dom";
import HeaderBar from "./components/header/Header.component";
import PatientsList from "./components/patientsList/PatientsList.component";
import "./Home.css";
import { PatientContextProvider } from "./PatientContext";
import { toast, ToastContainer } from "react-toastify";
import { usePatientContextState } from "./PatientHook";

export default function HomeLayout() {
    return (
        <PatientContextProvider>
            <ToastContainer />
            <div className="home-layout d-flex flex-column">
                <HeaderBar />
                <div className="d-flex flex-column m-0 flex-grow-1">
                    <div className="d-flex flex-grow-1 dashboard-container">

                        {/* Left Panel */}
                        <div className="col col-3 d-flex flex-column m-3 left-panel">
                            <PatientsList />
                            <AddPatientButton />
                        </div>

                        {/* Right Panel */}
                        <div className="col d-flex flex-column m-3 right-panel">
                            <Outlet />
                        </div>

                    </div>
                </div>
            </div>
        </PatientContextProvider>
    )

    function AddPatientButton() {
        const navigate = useNavigate();
        const { patients } = usePatientContextState();

        const onAddPatientClick = () => {
            if (patients.length >= 5) {
                toast.error("You can only track up to 5 patients per account.");
                return;
            }

            navigate("/addPatient");
        }

        return (<button onClick={onAddPatientClick} className="btn add-btn">Add New Patient</button>);
    }
}