import { ILeadBoardGroupedData } from "./utils/constant";

export type FilterFunction = (
  card: any,
  category: string,
  targetName: string
) => boolean;

export const categorize = (
  users:
    | {
        data: [];
        total?: number;
        count?: number;
        page?: number;
        pageCount?: number;
      }[]
    | any[],
  selectedFilters: string[],
  targetName: string,
  filterFn?: FilterFunction
): ILeadBoardGroupedData => {
  const defaultFilterFn: FilterFunction = (card, category, targetName) => {
    return card?.[targetName] === category;
  };

  const fn = filterFn || defaultFilterFn;

  return selectedFilters.reduce((acc, category) => {
    const filteredUsers = users
      .map((item) => ({
        ...item,
        data: item.data.filter((card: any) => fn(card, category, targetName)),
      }))
      .filter((item) => item.data.length > 0);

    const total = filteredUsers.reduce(
      (sum, item) => sum + (item.total || 0),
      0
    );
    const count = filteredUsers.reduce(
      (sum, item) => sum + (item.count || 0),
      0
    );
    const page = 1;
    const pageCount = Math.max(
      ...filteredUsers.map((item) => item.pageCount || 1),
      1
    );

    const data = filteredUsers.map((item) => item.data).flat();

    acc[category] = {
      data,
      total,
      count,
      page,
      pageCount,
    };

    return acc;
  }, {} as ILeadBoardGroupedData);
};
