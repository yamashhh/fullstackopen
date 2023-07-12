import { createContext, type Dispatch, type SetStateAction } from "react";

export const SORT_KEY = {
  LATEST: "LATEST",
  HIGHEST: "HIGHEST",
  LOWEST: "LOWEST",
} as const;

export const RepositoryListContext = createContext<{
  sortKey: (typeof SORT_KEY)[keyof typeof SORT_KEY];
  setSortKey: Dispatch<
    SetStateAction<(typeof SORT_KEY)[keyof typeof SORT_KEY]>
  >;
  searchKeyword: string;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
} | null>(null);
