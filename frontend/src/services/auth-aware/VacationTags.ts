import Tag from "../../models/tag/Tag";
import TagDraft from "../../models/tag/TagDraft";
import AuthAware from "./AuthAware";

export default class VacationTags extends AuthAware {
    async getAll(): Promise<Tag[]> {
        const response = await this.axiosInstance.get<Tag[]>(
            `${import.meta.env.VITE_REST_SERVER_URL}/tags`
        );
        return response.data;
    }

    async create(draft: TagDraft): Promise<Tag> {
        const response = await this.axiosInstance.post<Tag>(
            `${import.meta.env.VITE_REST_SERVER_URL}/tags`,
            draft
        );
        return response.data;
    }
}
