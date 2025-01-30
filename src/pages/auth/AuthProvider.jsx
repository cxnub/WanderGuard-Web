import { useNavigate } from "react-router-dom";
import { useCookies } from "hooks/useStorage";
import { AuthContext } from "hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import api from "src/config/api";
import axios from "axios";


export class AuthError extends Error {
    constructor(message) {
        super(message);
    }
}

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useCookies("token", null);
    const [user, setUser] = useCookies("user", null);
    const navigate = useNavigate();

    const handleToken = (token) => {
        // decode the token
        const decodedToken = jwtDecode(token);

        const user = {
            uuid: decodedToken.uuid,
            email: decodedToken.email,
            username: decodedToken.username,
        };

        // set the user
        setUser(user);

        // set the token
        setToken(token);

        // reset patient context


        // set token for axios
        // api.interceptors.request.use((config) => {
        //     config.headers.Authorization = `Bearer ${token}`;
        //     return config;
        // });

        navigate("/dashboard");

        return user;
    };

    // log in function
    const login = async (data) => {
        // log in the user
        try {
            const response = await api.post("/auth/login", data);

            return handleToken(response.data.token);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status == 401) {
                    throw new AuthError(error.response?.data.error);
                }

                throw new AuthError("An unexpected error occurred. Please try again.");
            }

            throw error;
        }
    };

    const register = async (data) => {
        // register the user
        try {
            const response = await api.post("/auth/register", data);

            return handleToken(response.data.token);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status == 400) {
                    throw new AuthError(error.response?.data.error);
                }

                throw new AuthError("An unexpected error occurred. Please try again.");
            }

            throw error;
        }
    };

    // log out function
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.clear();

        // reset token for axios
        // api.interceptors.request.use((config) => {
        //     config.headers.Authorization = ``;
        //     return config;
        // });

        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ token, user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
