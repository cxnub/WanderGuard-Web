import { useNavigate } from "react-router-dom";
import DropdownButton from "./DropdownButton.component";

export default function HeaderBar() {
    let navigate = useNavigate();

    return (
        <nav className="navbar bg-body-tertiary header-bar p-2">
            <div className="container-fluid d-flex justify-content-center gap-5">
                <a className="navbar-brand mx-5" href="">
                    <img src="./logo-text.svg" alt="Logo" className="img-fluid d-inline-block mx-2" />
                </a>
                <div className="links d-flex justify-content-center gap-3 mx-5">
                    <DropdownButton label={"Products"}>
                        <a href="/" className="dropdown-link px-3 py-2 me-3 mt-3">
                            <i className="bi bi-google-play me-2"></i>
                            Android App
                        </a>
                        <a href="/" className="dropdown-link px-3 py-2 me-3">
                            <i className="bi bi-globe me-2"></i>
                            Web App
                        </a>
                        <a href="/" className="dropdown-link px-3 py-2 me-3">
                            <i className="bi bi-telegram me-2"></i>
                            Telegram Bot
                        </a>
                        <a href="/" className="dropdown-link px-3 py-2 me-3 mb-3">
                            <i className="bi bi-smartwatch me-2"></i>
                            WanderTracker
                        </a>
                    </DropdownButton>
                    <div className="dropdown">
                        <button className="dropbtn">Pricing</button>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Our Mission</button>
                    </div>
                </div>

                <div className="d-flex justify-content-end mx-5">
                    <button className="btn mx-2 login-btn" onClick={() => navigate('/login')}>Login</button>
                    <button className="btn mx-2 signup-btn" onClick={() => navigate('/register')}>Get Started</button>
                </div>
            </div>
        </nav>)
}