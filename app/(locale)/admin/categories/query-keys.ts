export type CategoryListQueryKeyParams = {
  page: number;
  limit: number;
  q: string;
};

export const categoryKeys = {
  all: ["categories"] as const,
  lists: () => [...categoryKeys.all, "list"] as const,
  list: (params: CategoryListQueryKeyParams) => [...categoryKeys.lists(), params] as const,
};
