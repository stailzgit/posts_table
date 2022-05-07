import { useMemo, useState } from "react";
import usePostsSearch from "./usePostsSearch";

export const useSortedPosts = (posts) => {
  const [sort, setSort] = useState({ title: "id", orderByASC: true });

  const sortedPosts = useMemo(() => {
    if (sort.orderByASC) {
      return [...posts].sort((a, b) =>
        a[sort.title].toString().localeCompare(b[sort.title], undefined, {
          numeric: true,
          sensitivity: "base",
        })
      );
    } else {
      return [...posts].sort((b, a) =>
        a[sort.title].toString().localeCompare(b[sort.title], undefined, {
          numeric: true,
          sensitivity: "base",
        })
      );
    }
  }, [sort, posts]);

  return { sortedPosts, sort, setSort };
};

// export const usePosts = (posts, sort, query) => {
//   const sortedPosts = useSortedPosts(posts, sort);

//   const sortedAndSearchedPosts = useMemo(() => {
//     return sortedPosts?.filter((post) =>
//       post?.title?.toLowerCase().includes(query?.toLowerCase())
//     );
//   }, [query, sortedPosts]);

//   return sortedAndSearchedPosts;
// };
