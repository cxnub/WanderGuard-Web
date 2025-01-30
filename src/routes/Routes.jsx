import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "../pages/landing/Landing";
import HomeLayout from "../pages/home/Home.layout";
import EditPatient from "../pages/home/components/editPatient/EditPatient.component";
import PatientDashboard from "../pages/home/components/PatientDashboard.component";
import PageNotFound from "../pages/404/404.page";
import AuthLayout from "../pages/auth/Auth.layout";
import Login from "../pages/auth/login/Login.component";
import Register from "../pages/auth/register/Register.component";
import AddPatient from "pages/home/components/addPatient/AddPatient.component";
import { useAuth } from "src/hooks/useAuth";


const ProtectedRoute = ({ token, redirectPath = "/", children }) => {
    if (token) return children;
    return <Navigate to={redirectPath} />;
};

export default function AppRoutes() {
    const { token } = useAuth();

    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route element={<AuthLayout />}>
                <Route path="login" element={!token ? <Login /> : <Navigate to={"/dashboard"} />} />
                <Route path="register" element={!token ? <Register /> : <Navigate to={"/dashboard"} />} />
            </Route>

            <Route
                element={
                    <ProtectedRoute token={token} redirectPath="/">
                        <HomeLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="edit" element={<EditPatient />} />
                <Route path="dashboard" element={<PatientDashboard />} />
                <Route path="addPatient" element={<AddPatient />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}