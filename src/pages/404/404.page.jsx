import "./404.css";

export default function PageNotFound() {
    return (
        <div className="container-fluid h-100 d-flex flex-column not-found-container justify-content-center align-items-center py-5">
            <div className="container-fluid d-flex flex-column justify-content-center align-items-center info-container m-2 p-2">
                <h1 className="text-center fw-bold fs-1">Oops!</h1>
                <p className="fw-semibold m-3 fs-2">404 - PAGE NOT FOUND</p>
                <p className="m-3 fs-5">The page you are looking for does not exist or has been moved. <br />Try going back to our home page.</p>
                <a href="/" className="btn primary-btn m-2 p-3">Bring Me Home</a>
            </div>

        </div>
    )
}