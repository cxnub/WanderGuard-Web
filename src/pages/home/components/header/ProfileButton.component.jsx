import "./ProfileButton.css"
import { useState } from "react";
import { useAuth } from "hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import api from "src/config/api";
import ReactTimeAgo from 'react-time-ago'

export default function ProfileButton() {
    const [modalOpen, setModalOpen] = useState(false);
    const { logout, user } = useAuth();
    const [verifyLink, setVerifyLink] = useState(null);
    const [expiresIn, setExpiresIn] = useState(null);

    const verifyMutation = useMutation({
        mutationKey: ['verify'],
        mutationFn: async () => {
            setModalOpen(true);

            // check if there is an existing link that has not expired
            if (expiresIn && expiresIn > new Date()) {
                return;
            }

            // reset the link
            setVerifyLink(null);
            setExpiresIn(null);

            let response = await api.get("/auth/verify_telegram");

            setVerifyLink(response.data['verify_link']);
            setExpiresIn(new Date(response.data['expires_in'] * 1000));
            setModalOpen(true);
        },

        onError: () => {
            setModalOpen(true);
        }
    });

    return (<div className="dropdown-profile-container">
        <button className="profile-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
            </svg>
        </button>
        <div className="profile-card">
            <h3 className="fw-semibold fs-6"><span className="fw-light">Logged in as</span> {user.username}</h3>
            <a onClick={() => verifyMutation.mutate()} className="btn m-2 logout-btn">
                <i className="me-2 bi bi-telegram"></i>
                Connect Telegram Account
            </a>
            <a onClick={logout} className="btn m-2 logout-btn">
                <i className="me-2 bi bi-box-arrow-right"></i>
                Logout
            </a>
        </div>
        <div className="modal remove-modal" style={{ display: modalOpen ? "block" : "none" }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"><i className="me-2 bi bi-telegram"></i>
                            {verifyLink ?
                                "Connect Account to Telegram Notifications Bot" :
                                verifyMutation.isPending ?
                                    "Loading..." :
                                    "An error occurred, please try again."}
                        </h5>
                        <button onClick={() => setModalOpen(false)} type="button" className="btn-close" aria-label="Close"></button>
                    </div>
                    {verifyLink && <div className="modal-body">
                        <p className="m-0">Click on <a target="_blank" href={verifyLink} >this link</a> to connect your telegram account and start receiving wandering alerts.</p>
                        <p className="m-0 mt-3">This link expires <ReactTimeAgo date={expiresIn} locale="en-UK" timeStyle="round" /></p>
                    </div>}
                    <div className="modal-footer">
                        <button onClick={() => setModalOpen(false)} type="button" className="btn btn-secondary">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}