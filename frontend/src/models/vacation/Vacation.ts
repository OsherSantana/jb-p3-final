import Tag from "../tag/Tag";
import User from "../user/User";

export default interface Vacation {
    id: string;
    destination: string;
    description: string;
    startDate: string;
    endDate: string;
    price: number;
    imageFileName: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    isDraft?: boolean;
    user: User;
    tags: Tag[];
    isTagged?: boolean;
    taggedByUsers?: { id: string }[];
}
