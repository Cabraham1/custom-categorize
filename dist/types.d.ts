export type KeyResolver<T> = string | ((item: T) => unknown);
export interface CategorizeOptions<T> {
    only?: ReadonlyArray<string | number>;
    keyAs?: (rawKey: string) => string;
    includeUnmatched?: boolean;
    unmatchedKey?: string;
}
export type Grouped<T> = Record<string, T[]>;
export interface Page<T> {
    data: T[];
    total?: number;
    count?: number;
    page?: number;
    pageCount?: number;
}
export interface GroupedPage<T> {
    data: T[];
    total: number;
    count: number;
    page: number;
    pageCount: number;
}
export type GroupedPages<T> = Record<string, GroupedPage<T>>;
