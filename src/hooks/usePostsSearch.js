import { useState } from "react";
import useDebounce from "./useDebounceSearch.js";

const usePostsSearch = () => {
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search);

  const onSearchChange = (e) => {
    setSearch(e.currentTarget.value.toLowerCase());
  };

  const resetSearch = () => {
    setSearch("");
  };

  return {
    search,
    debouncedSearch: debouncedValue,
    onSearchChange,
    resetSearch,
  };
};

export default usePostsSearch;
