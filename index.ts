// index.ts (if using TypeScript)
export interface ILeadBoardGroupedUser {
  userStatus?: { status: string };
  country?: string;
  language?: string;
  businessUnit?: { name: string };
  // ... other properties as needed
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

// If you want to allow custom filtering, accept an optional filter function
export type FilterFunction = (
  card: ILeadBoardGroupedUser,
  category: string,
  groupName: string
) => boolean;

export const categorize = (
  users: {
    data: ILeadBoardGroupedUser[];
    total?: number;
    count?: number;
    page?: number;
    pageCount?: number;
  }[],
  selectedFilters: string[],
  groupName: string,
  filterFn?: FilterFunction
): ILeadBoardGroupedData => {
  // Default filter function if none is provided
  const defaultFilterFn: FilterFunction = (card, category, groupName) => {
    switch (groupName) {
      case "status":
        return card?.userStatus?.status === category;
      case "country":
        return card?.country === category;
      case "language":
        return card?.language === category;
      case "businessunit":
        return card?.businessUnit?.name === category;
      default:
        return false;
    }
  };

  const fn = filterFn || defaultFilterFn;

  return selectedFilters.reduce((acc, category) => {
    const filteredUsers = users
      .map((item) => ({
        ...item,
        data: item.data.filter((card) => fn(card, category, groupName)),
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
