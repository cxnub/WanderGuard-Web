import { Outlet, useNavigate } from "react-router-dom";
import "./Auth.css";

export default function AuthLayout() {
    const navigate = useNavigate();

    return (
        <div className="container-fluid auth-container h-100 d-flex flex-column justify-content-center align-items-center py-5">
            
            <div
            className="card auth-card d-flex border-0 rounded-4 flex-column justify-content-center align-items-center"
            >
                <img onClick={() => navigate("/")} className="img-fluid logo mb-4" src="logo-text.svg"></img>
                <Outlet />
            </div>
        </div>
    )
}