import ProfileButton from "./ProfileButton.component";

export default function HeaderBar() {
    return (
        <div className="dashboard-header-bar m-0 d-flex align-items-center justify-content-between">
            <a className="navbar-brand" href="">
                <img src="./logo-text.svg" alt="Logo" className="img-fluid d-inline-block mx-2" />
            </a>
            <ProfileButton />
        </div>
    )
}