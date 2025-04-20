import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios, { AxiosInstance } from "axios";
import AuthAware from "../services/auth-aware/AuthAware";

export default function useService<T extends AuthAware>(
    Service: { new(axiosInstance: AxiosInstance): T }
): T {
    const jwt = useSelector((state: RootState) => state.auth.jwt);

    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_REST_SERVER_URL,
        headers: {
            Authorization: `Bearer ${jwt}`
        },
    });

    return new Service(axiosInstance);
}
