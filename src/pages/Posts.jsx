import React, { useEffect, useState } from "react";
//API
import PostService from "../API/PostService";
//Components
import Pagination from "../components/Pagination";
import PostTable from "../components/PostTable";
import Filters from "../components/Filters";
//Hooks
import usePostsSearch from "../hooks/usePostsSearch";
import { useFetching } from "../hooks/useFetching";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const { search, debouncedSearch, onSearchChange, resetSearch } =
    usePostsSearch();
  const [sort, setSort] = useState({ title: "id", orderByASC: true });
  const [totalCount, setTotalCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  //Hook для обработки Loading и Error запроса
  const [fetchPosts, isPostsLoading, postsError] = useFetching(
    async (limit, page, query, sort) => {
      const response = await PostService.getAll(limit, page, query, sort);
      setPosts([...response.data]);
      const _totalCount = response.headers["x-total-count"];
      setTotalCount(_totalCount);
    }
  );

  //Вернуться к 1 странице при изменении limit
  useEffect(() => {
    fetchPosts(limit, page, debouncedSearch, sort);
    setPage(1);
  }, [limit, debouncedSearch]);

  useEffect(() => {
    fetchPosts(limit, page, debouncedSearch, sort);
  }, [page, sort]);

  //Показать страницу таблицы в URL
  useEffect(() => {
    navigate(`${page}`);
  }, [page]);

  if (postsError) return <h1>Произошла ошибка ${postsError}</h1>;

  return (
    <div className="posts__container container">
      <Filters
        search={search}
        onSearchChange={onSearchChange}
        resetSearch={resetSearch}
        limit={limit}
        setLimit={setLimit}
        isPostsLoading={isPostsLoading}
        isEmptySearch={!posts.length}
      />

      <PostTable
        debouncedSearch={debouncedSearch}
        sort={sort}
        setSort={setSort}
        posts={posts}
        isPostsLoading={isPostsLoading}
      />

      <Pagination
        className="pagination-bar"
        currentPage={page}
        totalCount={totalCount}
        pageSize={limit}
        onPageChange={(page) => setPage(page)}
      />
    </div>
  );
};

export default Posts;
