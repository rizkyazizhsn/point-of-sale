import { useState } from "react";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/constants/data-table-constant";
import useDebounce from "./use-debounce";

export function useDataTable() {
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [currentLimit, setCurrentLimit] = useState(DEFAULT_LIMIT);
  const [currentSearch, setCurrentSearch] = useState("");
  const debounce = useDebounce();

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleChangeLimit = (limit: number) => {
    setCurrentLimit(limit);
    setCurrentPage(DEFAULT_PAGE);
  };

  const handleChangeSearch = (search: string) => {
    debounce(() => {
      setCurrentSearch(search);
      setCurrentPage(DEFAULT_PAGE);
    }, 500)
  }
  return {
    currentPage,
    handleChangePage,
    currentLimit,
    handleChangeLimit,
    currentSearch,
    handleChangeSearch
  };
}
