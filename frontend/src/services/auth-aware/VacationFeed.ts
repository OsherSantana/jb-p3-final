import Vacation from "../../models/vacation/Vacation";
import AuthAware from "./AuthAware";

export default class VacationFeed extends AuthAware {
    async getFeed(filters: {
        page?: number;
        followedOnly?: boolean;
        activeOnly?: boolean;
        destination?: string;
    }): Promise<Vacation[]> {
        const queryParams = new URLSearchParams();

        if (filters.page) queryParams.append("page", filters.page.toString());
        if (filters.followedOnly) queryParams.append("followedOnly", "true");
        if (filters.activeOnly) queryParams.append("activeOnly", "true");
        if (filters.destination) queryParams.append("destination", filters.destination);

        const response = await this.axiosInstance.get<Vacation[]>(
            `${import.meta.env.VITE_REST_SERVER_URL}/vacations?${queryParams}`
        );

        return response.data;
    }
}
