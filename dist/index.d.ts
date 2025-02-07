export interface ILeadBoardGroupedUser {
    userStatus?: {
        status: string;
    };
    country?: string;
    language?: string;
    businessUnit?: {
        name: string;
    };
}
export interface ILeadBoardGroupedData {
    [category: string]: {
        data: ILeadBoardGroupedUser[];
        total?: number;
        count?: number;
        page?: number;
        pageCount?: number;
    };
}
export type FilterFunction = (card: ILeadBoardGroupedUser, category: string, groupName: string) => boolean;
export declare const categorize: (users: {
    data: ILeadBoardGroupedUser[];
    total?: number;
    count?: number;
    page?: number;
    pageCount?: number;
}[], selectedFilters: string[], groupName: string, filterFn?: FilterFunction) => ILeadBoardGroupedData;
