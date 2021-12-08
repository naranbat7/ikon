const categoryHost = "http://127.0.0.1:8081";
const newsHost = "http://127.0.0.1:8082";

export default {
  getCategoryApi: {
    method: `get`,
    url: `${categoryHost}/category`,
  },
  addCategoryApi: {
    method: `post`,
    url: `${categoryHost}/category`,
  },
  deleteCategoryApi: {
    method: `delete`,
    url: `${categoryHost}/category`,
  },
  getNewsApi: {
    method: `get`,
    url: `${newsHost}/news`,
  },
  addNewsApi: {
    method: `post`,
    url: `${newsHost}/news`,
  },
  deleteNewsApi: {
    method: `delete`,
    url: `${newsHost}/news`,
  },
};
