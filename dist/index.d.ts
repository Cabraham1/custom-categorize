import { ILeadBoardGroupedData } from "./utils/constant";
export type FilterFunction = (card: any, category: string, groupName: string) => boolean;
export declare const categorize: (users: {
    data: [];
    total?: number;
    count?: number;
    page?: number;
    pageCount?: number;
}[], selectedFilters: string[], groupName: string, filterFn?: FilterFunction) => ILeadBoardGroupedData;
