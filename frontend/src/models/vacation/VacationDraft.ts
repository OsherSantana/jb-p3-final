export default interface VacationDraft {
    title: string;
    body: string;
    destination?: string;
    startDate?: string;
    endDate?: string;
    price?: number;
    imageFileName?: string;
    tagIds?: string[];
    isDraft?: boolean;
}
