import React from "react";
import Highlighter from "react-highlight-words";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const PostTable = React.memo((props) => {
  console.log("PostTable");
  const { posts, sort, setSort, debouncedSearch, isPostsLoading } = props;

  const ArrowSortUI = (title) => {
    const isCurrentTitle = title === sort.title;
    const styleArrow = isCurrentTitle ? "table__sort-icon_active" : "";

    return (
      <div className="table__sort-wrap">
        {isCurrentTitle && !sort.orderByASC ? (
          <IoIosArrowUp className={styleArrow} />
        ) : (
          <IoIosArrowDown className={styleArrow} />
        )}
      </div>
    );
  };

  const onChangeSort = (title) => {
    setSort((prev) => ({
      title,
      //Если нажать текущий title, то меняем на противоположную сортировку.
      //Eсли нажать другой title, то сортировка становится в true (ASC).
      orderByASC: !(prev.title === title && prev.orderByASC),
    }));
  };

  const tableHeadData = [
    { title: "id", text: "ID", className: "table__head-id" },
    { title: "title", text: "Заголовок", className: "table__head-title" },
    { title: "body", text: "Описание", className: "table__head-body" },
  ];

  if (!posts.length && !isPostsLoading) return <div>Ничего не найдено</div>;

  if (!posts.length) return <></>;

  return (
    <table className="table">
      <thead>
        <tr className="table__head">
          {tableHeadData.map((item) => (
            <th
              className={item.className}
              onClick={() => onChangeSort(item.title)}
              key={item.title}
            >
              {item.text} {ArrowSortUI(item.title)}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {posts.map((post) => {
          const tableBodyData = [
            { className: "table__cell-id", text: post.id.toString() },
            { className: "table__cell-title", text: post.title },
            { className: "table__cell-body", text: post.body },
          ];
          return (
            <tr className="table__row" key={post.id}>
              {tableBodyData.map((cell) => (
                <td className={cell.className} key={cell.className + post.id}>
                  {/* Обертка для выделения текста поиска */}
                  <Highlighter
                    searchWords={[debouncedSearch]}
                    textToHighlight={cell.text}
                  />
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});

export default PostTable;
