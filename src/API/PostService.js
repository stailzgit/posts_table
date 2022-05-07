import axios from "axios";

export default class PostService {
  static async getAll(
    limit = 10,
    page = 1,
    query = "",
    sort = { title: "id", orderByASC: true }
  ) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts`,
      {
        params: {
          q: query,
          _limit: limit,
          _page: page,
          _sort: sort.title,
          _order: sort.orderByASC ? "asc" : "desc",
        },
      }
    );
    return response;
  }
}
