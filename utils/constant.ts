export interface ILeadBoardGroupedData {
  [category: string]: {
    data: any[];
    total?: number;
    count?: number;
    page?: number;
    pageCount?: number;
  };
}
