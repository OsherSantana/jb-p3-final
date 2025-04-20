import AuthAware from "./AuthAware";

export default class VacationReportService extends AuthAware {
    async getVacationReport(): Promise<{ destination: string; followers: number }[]> {
        const response = await this.axiosInstance.get(
            `${import.meta.env.VITE_REST_SERVER_URL}/reports/tag-stats`
        );
        return response.data;
    }
}

