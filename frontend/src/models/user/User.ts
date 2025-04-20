import UserDraft from "./UserDraft";

export default interface User extends UserDraft {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}
