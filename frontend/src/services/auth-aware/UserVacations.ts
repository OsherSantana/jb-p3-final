import Vacation from "../../models/vacation/Vacation";
import AuthAware from "./AuthAware";

export default class UserVacations extends AuthAware {
    async getUserVacations(): Promise<Vacation[]> {
        const response = await this.axiosInstance.get<Vacation[]>(
            `${import.meta.env.VITE_REST_SERVER_URL}/users/me/vacations`
        );
        return response.data;
    }

    async getAllVacations(): Promise<Vacation[]> {
        const response = await this.axiosInstance.get<Vacation[]>(
            `${import.meta.env.VITE_REST_SERVER_URL}/vacations`
        );
        return response.data;
    }


    async addVacation(formData: FormData): Promise<Vacation> {
        const response = await this.axiosInstance.post<Vacation>(
            `${import.meta.env.VITE_REST_SERVER_URL}/vacations`,
            formData
        );
        return response.data;
    }

    async getVacationById(vacationId: string): Promise<Vacation> {
        const response = await this.axiosInstance.get<Vacation>(
            `${import.meta.env.VITE_REST_SERVER_URL}/vacations/${vacationId}`
        );
        return response.data;
    }

    async getByUser(userId: string): Promise<Vacation[]> {
        const response = await this.axiosInstance.get<Vacation[]>(
            `${import.meta.env.VITE_REST_SERVER_URL}/users/${userId}/vacations`
        );
        return response.data;
    }

    async updateVacation(vacationId: string, formData: FormData): Promise<void> {
        await this.axiosInstance.put(
            `${import.meta.env.VITE_REST_SERVER_URL}/vacations/${vacationId}`,
            formData
        );
    }

    async deleteVacation(vacationId: string): Promise<void> {
        await this.axiosInstance.delete(
            `${import.meta.env.VITE_REST_SERVER_URL}/vacations/${vacationId}`
        );
    }

    async getVacationReport(): Promise<{ destination: string; followers: number }[]> {
        const res = await this.axiosInstance.get(
            `${import.meta.env.VITE_REST_SERVER_URL}/reports/tag-stats`
        );
        return res.data;
    }


}
