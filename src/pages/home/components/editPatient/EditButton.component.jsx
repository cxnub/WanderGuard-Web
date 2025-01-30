import { useNavigate } from "react-router-dom"

export default function EditButton() {
    const navigate = useNavigate();

    return <button onClick={() => navigate('/edit')} className="btn edit-btn me-2">Edit Safe Zone</button>
}